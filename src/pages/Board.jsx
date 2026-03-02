import React, { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';
import { ColumnComponent } from '../components/boardComponents/ColumnComponent';
import { TaskComponent } from '../components/boardComponents/TaskComponent';

export const Board = () => {

    const [columns, setColumns] = useState([
        {
            id: "todo",
            title: "To Do",
            tasks: [
                { id: "1", title: "Task 1", description: "Description 1" },
                { id: "2", title: "Task 2", description: "Description 2" },
                { id: "3", title: "Task 3", description: "Description 3" }
            ]
        },
        {
            id: "in-progress",
            title: "In Progress",
            tasks: [
                { id: "4", title: "Task 4", description: "Description 4" },
                { id: "5", title: "Task 5", description: "Description 5" },
                { id: "6", title: "Task 6", description: "Description 6" }
            ]
        },
        {
            id: "done",
            title: "Done",
            tasks: [
                { id: "7", title: "Task 7", description: "Description 7" },
                { id: "8", title: "Task 8", description: "Description 8" },
                { id: "9", title: "Task 9", description: "Description 9" }
            ]
        }
    ]);
    const arrayMove = (array, from, to) => {
        const newArray = array.slice();
        newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
        return newArray;
    };


    const handleDragEnd = (event) => {
        const { operation } = event;
        const activeId = operation.source?.id;
        const overId = operation.target?.id;

        if (!activeId || !overId || activeId === overId) return;

        setColumns((prev) => {
            const activeColumn = prev.find((col) => col.tasks.some((t) => t.id === activeId));
            const overColumn = prev.find((col) => col.tasks.some((t) => t.id === overId)) || prev.find((col) => col.id === overId);

            if (!activeColumn || !overColumn) return prev;

            const activeTaskIndex = activeColumn.tasks.findIndex((t) => t.id === activeId);

            // Moving within the same column
            if (activeColumn.id === overColumn.id) {
                const overTaskIndex = overColumn.tasks.findIndex((t) => t.id === overId);
                if (activeTaskIndex === overTaskIndex) return prev;

                const newTasks = arrayMove(activeColumn.tasks, activeTaskIndex, overTaskIndex);
                return prev.map((col) => col.id === activeColumn.id ? { ...col, tasks: newTasks } : col);
            }

            // Moving to a different column
            const taskToMove = activeColumn.tasks[activeTaskIndex];
            const newActiveTasks = activeColumn.tasks.filter((t) => t.id !== activeId);

            let newOverTasks = [...overColumn.tasks];
            const overTaskIndex = overColumn.tasks.findIndex((t) => t.id === overId);

            if (overTaskIndex !== -1) {
                newOverTasks.splice(overTaskIndex, 0, taskToMove);
            } else {
                newOverTasks.push(taskToMove);
            }

            return prev.map((col) => {
                if (col.id === activeColumn.id) return { ...col, tasks: newActiveTasks };
                if (col.id === overColumn.id) return { ...col, tasks: newOverTasks };
                return col;
            });
        });
    };


    return (
        <main className="h-full flex flex-row bg-ui-bg/80 overflow-x-auto p-4 gap-4">
            <DragDropProvider onDragOver={handleDragEnd}>

                {columns.map((column) => (
                    <ColumnComponent
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        tasks={column.tasks}
                    >
                        {column.tasks.map((task, index) => (
                            <TaskComponent
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                description={task.description}
                                index={index}
                                columnId={column.id}
                            />
                        ))}
                    </ColumnComponent>
                ))}
            </DragDropProvider>
        </main>
    );
}

export default Board;
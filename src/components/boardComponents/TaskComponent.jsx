import React from 'react';
import { useSortable } from '@dnd-kit/react/sortable';


export const TaskComponent = ({ id, title, description, index, columnId }) => {

    const { ref } = useSortable({
        id,
        index,
        group: columnId
    });


    return (
        <div ref={ref} className="bg-ui-bg p-4 rounded-lg shadow-md border border-black/5 dark:border-white/5 cursor-grab active:cursor-grabbing">
            <h3 className="text-lg font-semibold text-ui-text mb-1">{title}</h3>
            <p className="text-sm text-ui-text/70">{description}</p>
        </div>
    );
}
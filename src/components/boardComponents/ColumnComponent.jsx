import React from 'react';
import { useDroppable } from '@dnd-kit/react';

export const ColumnComponent = ({ children, title, id }) => {
    const { ref } = useDroppable({ id });
    return (
        <div ref={ref} className="flex-1 flex flex-col min-w-[300px] p-5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
            <h1 className="text-xl font-bold text-ui-text uppercase mb-4">{title}</h1>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    );
}

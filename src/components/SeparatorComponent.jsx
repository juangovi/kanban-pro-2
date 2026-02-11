import React from 'react';

export const SeparatorComponent = ({ text }) => {
    return (
        <div className="relative mb-8 w-full">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white dark:bg-[#28283d] text-gray-400 dark:text-gray-300">{text}</span>
            </div>
        </div>
    );
};
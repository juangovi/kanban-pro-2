import React from 'react';

export const SeparatorComponent = ({ text }) => {
    return (
        <div className="relative mb-8 w-full">
            <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-separator"></div>
            </div>
            <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-ui-bg text-ui-text-secondary">{text}</span>
            </div>
        </div>
    );
};

export default SeparatorComponent;
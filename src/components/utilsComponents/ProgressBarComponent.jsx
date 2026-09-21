import React from 'react';

export const ProgressBarComponent = ({ progreso, title }) => {
    return (
        <div>
            <div className="flex justify-between">
                <p className="font-bold text-ui-text-secondary truncate mb-2">
                    {title}
                </p>
                <p className="font-bold text-ui-text-secondary truncate mb-2">
                    {progreso}%
                </p>
            </div>
            <div className="bar-progress">
                <div className="bar-progress-fill" style={{
                    width: `${progreso}%`,
                }} />
            </div>

        </div>
    );
};

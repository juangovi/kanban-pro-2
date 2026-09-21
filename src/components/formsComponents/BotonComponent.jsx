import React from 'react';

export const BotonComponent = ({ type, text, Icon, onClick, disabled = false }) => {
    return (
        <button disabled={disabled} onClick={onClick} className="flex items-center justify-center gap-2 px-4 py-2 uppercase w-full h-14 bg-brand-primary text-white font-bold rounded-lg shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/80 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed" type={type}>
            {Icon && <Icon className="size-6" />}
            {text}
        </button>
    );
};

export default BotonComponent;
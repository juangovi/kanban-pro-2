import React from 'react';

export const BotonComponent = ({ type, text }) => {
    return (
        <button className="uppercase w-full h-14 bg-brand-primary text-white font-bold rounded-lg shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/80 transition-all active:scale-[0.98]" type={type}>
            {text}
        </button>
    );
};

export default BotonComponent;
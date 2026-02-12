import React from 'react';

export const BotonComponent = ({ type, text }) => {
    return (
        <button className="uppercase w-full h-14 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-green-600/90 transition-all active:scale-[0.98]" type={type}>
            {text}
        </button>
    );
};

export default BotonComponent;
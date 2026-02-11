//provider de bloqueo de pantalla de carga

import { createContext, useContext, useState } from 'react';

const LoadingContext = createContext(); // creamos el contexto

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);


    return (
        <LoadingContext.Provider value={{ loading, setLoading }}> {/* pasamos el valor al contexto */}
            {children}
            {loading && (
                <div className='fixed inset-0 z-100 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 pointer-events-auto'>
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
            )}
        </LoadingContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => useContext(LoadingContext);

//provider de bloqueo de pantalla de carga

import { createContext, useContext, useState } from 'react';
import LoadingComponent from '../components/utilsComponents/LoadingComponent.jsx';

const LoadingContext = createContext(); // creamos el contexto

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);


    return (
        <LoadingContext.Provider value={{ loading, setLoading }}> {/* pasamos el valor al contexto */}
            {children}
            {loading && (
                <LoadingComponent />
            )}
        </LoadingContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => useContext(LoadingContext);

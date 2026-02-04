//provider de errores global

import { createContext, useContext, useCallback, useState } from 'react';
import { InfoToast } from '../components/InfoToast.jsx';

const InfoContext = createContext(); // creamos el contexto

export const InfoProvider = ({ children }) => {
    const [messages, setMessages] = useState([]); // estado que guarda los mensajes

    const addMessage = useCallback((message, type = "") => {
        const id = Date.now(); // id unico para cada mensaje
        setMessages(prev => [{ id, message, type }, ...prev].slice(0, 3)); // Nuevo arriba, máximo 3
    }, []);

    const removeMessage = useCallback((id) => {
        setMessages(prev => prev.filter(err => err.id !== id)); // elimina el mensaje
    }, []);


    return (
        <InfoContext.Provider value={{ addMessage }}> {/* pasamos el valor al contexto */}
            {children}
            <div className="fixed top-5 inset-x-0 z-50 flex flex-col items-center pointer-events-none gap-2">
                {messages.map(message => (
                    <InfoToast
                        key={message.id}
                        message={message.message}
                        onClose={() => removeMessage(message.id)}
                        type={message.type}
                    />
                ))}
            </div>
        </InfoContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useInfo = () => useContext(InfoContext);
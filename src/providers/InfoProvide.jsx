//provider de errores global

import { createContext, useContext, useCallback, useState } from 'react';
import { InfoToast } from '../components/InfoToast.jsx';

const InfoContext = createContext();

export const InfoProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const addMessage = useCallback((message, type = "") => {
        const id = Date.now();
        setMessages(prev => [...prev.slice(-2), { id, message, type }]); // Máximo 3 errores
    }, []);

    const removeMessage = useCallback((id) => {
        setMessages(prev => prev.filter(err => err.id !== id));
    }, []);


    return (
        <InfoContext.Provider value={{ addMessage }}>
            {children}
            <div className="fixed top-5 right-5 z-50 flex flex-col">
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
import { createContext, useContext, useState, useCallback } from 'react';
import { XMarkIcon } from "@heroicons/react/24/outline";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        content: null,
    });

    const openModal = useCallback((content) => {
        setModalConfig({
            isOpen: true,
            content,
        });
    }, []);

    const closeModal = useCallback(() => {
        setModalConfig(prev => ({ ...prev, isOpen: false }));

        setTimeout(() => {
            setModalConfig({ isOpen: false, content: null });
        }, 300);
    }, []);

    return (
        <ModalContext.Provider value={{ openModal, closeModal }}>
            {children}
            {modalConfig.isOpen && (
                <div onClick={() => closeModal()} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto bg-black/40 animate-slideDown">
                    <div className='relative w-full max-w-4xl flex flex-col overflow-y-auto overflow-x-hidden px-6 py-8 md:px-12 bg-ui-bg rounded-3xl shadow-xl my-auto' onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => closeModal()} className="absolute top-4 right-4 text-ui-text hover:text-brand-primary transition-colors">
                            <XMarkIcon className="w-8 h-8" />
                        </button>
                        {modalConfig.content}
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

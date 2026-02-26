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
                <div onClick={() => closeModal()} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/40 animate-slideDown">
                    <div className='relative w-full max-w-4xl bg-ui-bg rounded-3xl shadow-xl overflow-hidden my-auto flex flex-col' onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => closeModal()} className="absolute top-4 right-6 z-10 text-ui-text hover:text-brand-primary transition-colors bg-ui-bg/80 backdrop-blur-md rounded-full p-1">
                            <XMarkIcon className="w-8 h-8" />
                        </button>
                        <div className="overflow-y-auto overflow-x-hidden max-h-[calc(100vh-5rem)] pl-6 pr-8 md:pl-12 md:pr-14 py-8">
                            {modalConfig.content}
                        </div>
                    </div>
                </div>
            )}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);

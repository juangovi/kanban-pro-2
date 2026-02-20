import React from 'react';
import { InputComponent } from '../components/formsComponents/InputComponent.jsx';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BotonComponent } from '../components/formsComponents/BotonComponent.jsx';

import { useAuth } from '../hooks/useAuth.js';

export const PasswordReset = ({ isOpen, onClose }) => {
    const { t } = useTranslation();
    const { state, dispatch, handlePasswordReset } = useAuth();

    const handleChange = (e) => {
        dispatch({ type: 'UPDATE_FIELD', field: e.target.name, value: e.target.value });
        dispatch({ type: 'SET_ERRORS_PASSWORD_RESET', payload: { ...state.passwordResetErrors, [e.target.name]: false } });
    }






    if (!isOpen) return null;


    return (
        <div onClick={() => onClose()} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto bg-black/40">
            <div className='relative w-full max-w-2xl flex flex-col overflow-y-auto overflow-x-hidden px-6 py-8 md:px-12 bg-ui-bg rounded-3xl shadow-xl my-auto' onClick={(e) => e.stopPropagation()}>
                <button onClick={() => onClose()} className="absolute top-4 right-4 text-ui-text hover:text-brand-primary transition-colors">
                    <XMarkIcon className="w-8 h-8" />
                </button>
                <div className='max-w-md mx-auto w-full'>
                    <div className='mb-8'>
                        <h1 className="font-bold text-3xl uppercase text-ui-text">{t("passwordResetTitle")}</h1>
                        <p className="mt-2 text-ui-text-secondary">{t("passwordResetDescription")}</p>
                    </div>
                    <form onSubmit={(e) => handlePasswordReset(e, onClose)} className="w-full mb-8 flex flex-col gap-6">
                        <InputComponent name="email" error={state.passwordResetErrors.email} Icon={EnvelopeIcon} label={t("email")} placeholder={t("emailplaceholder")} type="email" value={state.auth.email} onChange={handleChange} />
                        <BotonComponent type="submit" text={t("sendPasswordReset")} />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;


import React from 'react';
import { InputComponent } from '../components/formsComponents/InputComponent.jsx';
import { UserIcon, LockClosedIcon, ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { LoginButtons } from '../components/formsComponents/LoginButtons.jsx';
import { useTranslation } from "react-i18next";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { BotonComponent } from '../components/formsComponents/BotonComponent.jsx';
import { SeparatorComponent } from '../components/SeparatorComponent.jsx';
import { useAuth } from '../hooks/useAuth.js';
import { useLoading } from '../providers/LoadingProvider.jsx';
import { useInfo } from '../providers/InfoProvider.jsx';


export const SignUp = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { handleSignUp, credentials, setcredentials, erroresSignUp, setErroresSignUp } = useAuth();
  const { setLoading } = useLoading();
  const { addMessage } = useInfo();






  if (!isOpen) return null;


  return (
    <div onClick={() => onClose()} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto bg-black/40">
      <div className='relative w-full max-w-2xl flex flex-col overflow-scroll px-6 py-8 md:px-12 bg-white dark:bg-[#28283d] rounded-3xl shadow-xl my-auto' onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onClose()} className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
          <XMarkIcon className="w-8 h-8" />
        </button>
        <div className='max-w-md mx-auto w-full'>
          <div className='mb-8'>
            <h1 className="font-bold text-3xl uppercase dark:text-white">{t("signUpTitle")}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{t("signUpDescription")}</p>
          </div>
          <LoginButtons></LoginButtons>
          <SeparatorComponent text={t("continueWithEmail")} />
          <form action="" onSubmit={(e) => {
            e.preventDefault();
            handleSignUp(e, onClose);
          }} className="w-full mb-8">
            <div>
              <InputComponent error={erroresSignUp.nombre} Icon={UserIcon} label={t("completeName")} placeholder={t("completeName")} type="text" value={credentials.nombre} onChange={(e) => { setcredentials({ ...credentials, nombre: e.target.value }); setErroresSignUp({ ...erroresSignUp, nombre: false }); }} />
              <InputComponent error={erroresSignUp.email} Icon={EnvelopeIcon} label={t("email")} placeholder={t("emailplaceholder")} type="email" value={credentials.email} onChange={(e) => { setcredentials({ ...credentials, email: e.target.value }); setErroresSignUp({ ...erroresSignUp, email: false }); }} />
              <InputComponent error={erroresSignUp.password} Icon={LockClosedIcon} label={t("password")} placeholder={t("passwordplaceholder")} type="password" value={credentials.password} onChange={(e) => { setcredentials({ ...credentials, password: e.target.value }); setErroresSignUp({ ...erroresSignUp, password: false }); }} />
              <InputComponent error={erroresSignUp.passwordConfirmation} Icon={ShieldCheckIcon} label={t("passwordConfirmation")} placeholder={t("passwordConfirmation")} type="password" value={credentials.passwordConfirmation} onChange={(e) => { setcredentials({ ...credentials, passwordConfirmation: e.target.value }); setErroresSignUp({ ...erroresSignUp, passwordConfirmation: false }); }} />
              <BotonComponent type="submit" text={t("createAccount")} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
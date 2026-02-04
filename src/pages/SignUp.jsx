import React from 'react';
import { InputComponent } from '../components/formsComponents/InputComponent.jsx';
import { UserIcon, LockClosedIcon, ShieldCheckIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { LoginButtons } from '../components/formsComponents/LoginButtons.jsx';
import { useState } from 'react';
import { auth } from '../firebaseConfig.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { updateProfile } from "firebase/auth";
import { XMarkIcon } from "@heroicons/react/24/outline";



export const SignUp = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const [credentials, setcredentials] = useState({
    nombre: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  });

  const signUpWithEmailAndPassword = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, credentials.email, credentials.password);
      const user = userCredential.user;
      await updateProfile(userCredential.user, {
        displayName: credentials.nombre
      });
      console.log('Usuario registrado:', user);
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
    }
  };

  if (!isOpen) return null;


  return (
    <div onClick={() => onClose()} className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto bg-black/40">
      <div className='relative w-full max-w-md flex flex-col px-6 py-8 md:px-12 bg-white dark:bg-[#28283d] rounded-3xl shadow-xl my-auto' onClick={(e) => e.stopPropagation()}>
        <button onClick={() => onClose()} className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-200 transition-colors">
          <XMarkIcon className="w-8 h-8" />
        </button>
        <div className='mb-8'>
          <h1 className="font-bold text-3xl uppercase dark:text-white">{t("signUpTitle")}</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">{t("signUpDescription")}</p>
        </div>
        <LoginButtons></LoginButtons>
        <div className="relative mb-8 w-full max-w-md">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-[#28283d] text-gray-400 dark:text-gray-300">{t("continueWithEmail")}</span>
          </div>
        </div>
        <form action="" onSubmit={(e) => {
          e.preventDefault();
          signUpWithEmailAndPassword();
        }} className="w-full max-w-md mb-8">
          <div>
            <InputComponent Icon={UserIcon} label={t("completeName")} placeholder={t("completeName")} type="text" value={credentials.nombre} onChange={(e) => setcredentials({ ...credentials, nombre: e.target.value })} />
            <InputComponent Icon={EnvelopeIcon} label={t("email")} placeholder={t("emailplaceholder")} type="email" value={credentials.email} onChange={(e) => setcredentials({ ...credentials, email: e.target.value })} />
            <InputComponent Icon={LockClosedIcon} label={t("password")} placeholder={t("passwordplaceholder")} type="password" value={credentials.password} onChange={(e) => setcredentials({ ...credentials, password: e.target.value })} />
            <InputComponent Icon={ShieldCheckIcon} label={t("passwordConfirmation")} placeholder={t("passwordConfirmation")} type="password" value={credentials.passwordConfirmation} onChange={(e) => setcredentials({ ...credentials, passwordConfirmation: e.target.value })} />
            <button className="uppercase w-full h-14 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-green-600/90 transition-all active:scale-[0.98]" type='submit'>
              {t("createAccount")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
import React from 'react';
import { InputComponent } from '../components/formsComponents/InputComponent.jsx';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LockClockIcon from '@mui/icons-material/LockClock';
import EmailIcon from '@mui/icons-material/Email';
import { LoginButtons } from '../components/formsComponents/LoginButtons.jsx';

import { useTranslation } from "react-i18next";

export const SignUp = ({ isOpen, onClose}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;
   

    return (
       <div onClick={() => onClose()} className="fixed flex items-center justify-center w-full h-screen  backdrop-blur-sm dark:text-white">
          <div className='w-full max-w-120 flex flex-col px-15 py-5 bg-[#28283d] rounded-3xl' onClick={(e) => e.stopPropagation()}>
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
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-300">{t("continueWithEmail")}</span>
          </div>
        </div>
            <form action="">
                <div>
                    <InputComponent Icon={PersonIcon} label={t("completeName")} placeholder={t("completeName")} type="text"/>
                    <InputComponent Icon={EmailIcon} label={t("email")} placeholder={t("emailplaceholder")} type="email"/>
                    <InputComponent Icon={LockIcon} label={t("password")} placeholder={t("passwordplaceholder")} type="password"/>
                    <InputComponent Icon={LockClockIcon} label={t("passwordConfirmation")} placeholder={t("passwordConfirmation")} type="password"/>
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
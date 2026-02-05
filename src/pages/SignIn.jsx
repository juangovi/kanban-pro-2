import { useState, useRef } from 'react'

import SignUp from './SignUp.jsx';
import { InputComponent } from '../components/formsComponents/InputComponent.jsx';
import { LoginButtons } from '../components/formsComponents/LoginButtons.jsx';

import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";
import { useInfo } from '../providers/InfoProvide.jsx';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig.js';

export const SignIn = () => {

  const { addMessage } = useInfo();
  const [modalOpen, setModalOpen] = useState(false);
  const [errores, setErrores] = useState({
    email: false,
    password: false
  })

  const { t } = useTranslation();

  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  })

  const handleLogin = (e) => {
    e.preventDefault();
    const emailVacio = credenciales.email === '';
    const passwordVacia = credenciales.password === '';

    if (emailVacio || passwordVacia) {
      setErrores({ email: emailVacio, password: passwordVacia });
      addMessage(t("completeFields"), "error");
      return;
    }
    const emailInvalido = !credenciales.email.includes("@");
    const passwordCorta = credenciales.password.length < 8;

    if (emailInvalido || passwordCorta) {
      setErrores({ email: emailInvalido, password: passwordCorta });
      if (emailInvalido) addMessage(t("emailInvalid"), "error");
      else if (passwordCorta) addMessage(t("passwordInvalid"), "error");

      return;
    }

    setErrores({ email: false, password: false });
    loginWithEmail();
  }

  const loginWithEmail = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, credenciales.email, credenciales.password);
      const user = userCredential.user;
      addMessage(t("userCreated"), "success");
    } catch (error) {
      switch (error.code) {
        case 'auth/invalid-credential':
          addMessage(t("errorLogin"), "error");
          break;
        case 'auth/user-not-found':
          addMessage(t("errorLogin"), "error");
          break;
        case 'auth/wrong-password':
          addMessage(t("errorLogin"), "error");
          break;
        case 'auth/too-many-requests':
          addMessage(t("errorLogin"), "error");
          break;
        default:
          console.log(error);
          addMessage(t("unexpectedError"), "error");
      }
    }
  }




  return (
    <div className='flex w-full min-h-screen overflow-scroll'>
      <div className='bg-[#0c1a0a] flex-1 hidden lg:block relative'>
        <div className="flex flex-col mx-25 mt-50 max-w-md text-white">
          <h1 className="uppercase font-bold text-5xl mb-4">{t("titleInicio")} <br /><span className="text-green-600">{t("titleInicio2")}</span></h1>
          <p className="text-gray-300 text-2xl">{t("subtitleInicio")}</p>
        </div>
        <a href='https://github.com/juangovi' className='absolute bottom-1/12 left-1/12 flex text-white border-white/20 bg-white/10 backdrop-blur-md border rounded-full px-4 py-3 items-center gap-3 w-fit hover:bg-white/20 transition-all cursor-pointer'>
          <img src='https://avatars.githubusercontent.com/u/65275993?v=4&size=64' alt='jagovi' className='w-10 h-10 rounded-full object-cover' />
          <span className='text-white text-sm font-medium'>{t("createBy")}</span>
        </a>
      </div>
      <div className='bg-white dark:bg-gray-800 flex-1 flex flex-col justify-center items-center px-15 lg:px-0 '>
        <div>
          <div className="mb-8 w-full">
            <h1 className="font-bold text-3xl uppercase dark:text-white">{t("welcome")}</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">{t("credentialsDescription")}</p>
          </div>
          <LoginButtons></LoginButtons>
          <div className="relative mb-8 w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-300">{t("continueWithEmail")}</span>
            </div>
          </div>
          <form onSubmit={(e) => handleLogin(e)} className="w-full mb-8">
            <InputComponent error={errores.email} Icon={EnvelopeIcon} label={t("email")} placeholder={t("emailplaceholder")} type="text" value={credenciales.email} onChange={(e) => {
              setCredenciales({ ...credenciales, email: e.target.value });
              setErrores({ ...errores, email: false });
            }}></InputComponent>
            <InputComponent error={errores.password} Icon={LockClosedIcon} showPasswordRecovery={true} label={t("password")} placeholder={t("passwordplaceholder")} type='password' value={credenciales.password} onChange={(e) => {
              setCredenciales({ ...credenciales, password: e.target.value });
              setErrores({ ...errores, password: false });
            }} />
            <button className="uppercase w-full h-14 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-green-600/90 transition-all active:scale-[0.98]" type='submit'>
              {t("enter")}
            </button>
          </form>
          <div className="text-center">
            <p className="text-gray-500">
              {t("noAccount")}
              <a onClick={() => setModalOpen(true)} className="text-green-600 font-bold ml-1 hover:underline" href="#">{t("freeSignUp")}</a>
            </p>
          </div>
        </div>
        <a href='https://github.com/juangovi' className='mt-10 flex lg:hidden dark:text-white dark:bg-white/10 bg-black/5 border border-black/10 dark:border-white/10 backdrop-blur-md rounded-full px-4 py-2 items-center gap-3 w-fit hover:bg-black/10 transition-all cursor-pointer'>
          <img src='https://avatars.githubusercontent.com/u/65275993?v=4&size=64' alt='jagovi' className='w-8 h-8 rounded-full object-cover' />
          <span className='text-sm font-medium'>{t("createBy")}</span>
        </a>
      </div>
      <SignUp isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}

export default SignIn;

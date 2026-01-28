import { useState } from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import SignUp from '../components/SignUp.jsx';
import { InputComponent } from '../components/formsComponents/InputComponent.jsx';
import { LoginButtons } from '../components/formsComponents/LoginButtons.jsx';
import { auth } from '../firebaseConfig.js';

export const SignIn = () => {

  const [modalOpen, setModalOpen] = useState(false);

  const [credenciales, setCredenciales] = useState({
    email: '',
    password: ''
  })

 

const signUpWithEmailAndPassword = async () => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, credenciales.email, credenciales.password);
    const user = userCredential.user;
    console.log('Usuario registrado:', user);
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
  }
};

 
  return (
    <div className='flex w-full h-screen'>
      <a href="https://github.com/juangovi" className='absolute bottom-20 hidden dark:text-white dark:border-white/20 dark:bg-white/10 md:flex bg-black/10 border-black/20 left-20 lg:bg-white/10 backdrop-blur-md border lg:border-white/20 rounded-full px-4 py-3 items-center gap-3 w-fit hover:bg-white/20 transition-all cursor-pointer'>
          <img src='https://avatars.githubusercontent.com/u/65275993?v=4&size=64' alt='jagovi' className='w-10 h-10 rounded-full object-cover' />
          <span className='lg:text-white text-sm font-medium'>Creado por Juangovi</span>
      </a>
      <div className='bg-[#0c1a0a] flex-1 hidden lg:block'>
        <div className="flex flex-col mx-25 mt-50 max-w-md text-white">
          <h1 className="uppercase font-bold text-5xl mb-4">Domina tu flujo de <br /><span className="text-green-600">trabajo</span></h1>
          <p className="text-gray-300 text-2xl">La herramienta Kanban definitiva para equipos de alto rendimiento. Optimiza tareas, visualiza el progreso y agiliza los envíos.</p>
        </div>
      </div>
      <div className='bg-white dark:bg-gray-800 flex-1 flex flex-col justify-center items-center px-15 lg:px-0'>
        <div className="mb-8">
          <h1 className="font-bold text-3xl uppercase dark:text-white">bienvenido de vuelta</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">introduce tus credenciales para acceder a su centro de trabajo</p>
        </div>
        <LoginButtons></LoginButtons>
        <div className="relative mb-8 w-full max-w-md">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-100 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-300">o continua con email</span>
          </div>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          signUpWithEmailAndPassword();
        }} className="w-full max-w-md mb-8">
            <InputComponent label='Correo electronico' placeholder="name@company.com" type="email" value={credenciales.email} onChange={(e) => setCredenciales({...credenciales, email: e.target.value})}></InputComponent>
            <InputComponent showPasswordRecovery={true} label='Contraseña' placeholder='Contraseña' type='password' value={credenciales.password} onChange={(e) => setCredenciales({...credenciales, password: e.target.value})}/>
           <button className="uppercase w-full h-14 bg-green-600 text-white font-bold rounded-lg shadow-lg shadow-primary/20 hover:bg-green-600/90 transition-all active:scale-[0.98]" type='submit'>
              entrar
            </button>
        </form>
        <div>
          <p className="text-gray-500">
            ¿no tienes una cuenta?
            <a onClick={() => setModalOpen(true)} className="text-green-600 font-bold ml-1 hover:underline" href="#">registrate gratis</a>
          </p>
        </div>
      </div>
      <SignUp isOpen={modalOpen} onClose={() => setModalOpen(false)}/>
    </div>
  )}

export default SignIn;

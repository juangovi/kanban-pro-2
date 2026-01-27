import React from 'react';
import { InputComponent } from '../components/formsComponents/InputComponent.jsx';

export default function SignUp({ isOpen, onClose}) {
    if (!isOpen) return null;
   

    return (
       <div onClick={() => onClose()} className="fixed flex items-center justify-center w-full h-screen bg-gray-900/15 backdrop-blur-sm dark:text-white">
          <div className='w-full max-w-120 flex flex-col px-15 py-5 bg-blue-950 rounded-lg' onClick={(e) => e.stopPropagation()}>
            <div className='mb-8'>
                <h1 className="font-bold text-3xl uppercase dark:text-white">Crea tu cuenta</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-300">introduce tus credenciales para registrate</p>
            </div>
            <form action="">
                <div>
                    <InputComponent label='Nombre completo' placeholder="nombre completo" type="text"/>
                </div>
            </form>
          </div>
       </div>
    );
}
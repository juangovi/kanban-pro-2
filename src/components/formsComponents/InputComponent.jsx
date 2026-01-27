import React, { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';



export const InputComponent = ({ 
    placeholder = '', 
    value, 
    onChange, 
    type = 'text',
    label = '',
    indrec,
}) => {


    const [mostrarContraseña, setmostrarContraseña] = useState(false);

    const typeInput = type === 'password' && mostrarContraseña ? 'text' : type;

    const placeholderInput = type === 'password' ? (mostrarContraseña ? placeholder : '••••••••••') : placeholder;

    return (
       <div className='relative'>
            <div className='flex justify-between'>
                <label htmlFor="password" className="block text-sm font-bold dark:text-white">{label}</label>
                    {indrec &&
                        <a className='hidden sm:flex text-green-600 text-sm font-bold hover:underline' href="">¿olvidaste la Contraseña?</a>
                    }
            </div>
             {type === 'password' && (mostrarContraseña ?
                <VisibilityOffIcon className="size-6 cursor-pointer absolute right-4 top-9 dark:text-white hover:text-green-600" onClick={() => {setmostrarContraseña(!mostrarContraseña)} }></VisibilityOffIcon>
                : 
                <VisibilityIcon className="size-6 cursor-pointer absolute right-4 top-9 dark:text-white hover:text-green-600" onClick={() => {setmostrarContraseña(!mostrarContraseña)} }></VisibilityIcon>
              )}     
            <input type={typeInput} className={`${ type === 'password' ? "pr-15" : "" } dark:border-gray-700 dark:bg-gray-700 dark:text-white w-full h-14 px-4 bg-background-light border border-gray-100 rounded-lg focus:ring-2 focus:ring-green-600/20 focus:border-green-600 outline-none transition-all duration-200 text-[#101d0c] placeholder:text-gray-400`} placeholder={placeholderInput} value={value} onChange={onChange}/>
            {indrec && (
                <a className='sm:hidden text-green-600 font-bold hover:underline' href="">¿olvidaste la Contraseña?</a>
            )}
          </div>
    );
};
import React, { useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useTranslation } from "react-i18next";


export const InputComponent = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  label = '',
  showPasswordRecovery = false,
  Icon,
}) => {

  const { t } = useTranslation();

  const [mostrarContraseña, setmostrarContraseña] = useState(false);

  const [mostrarIcono, setmostrarIcono] = useState(false);

  const typeInput = type === 'password' && mostrarContraseña ? 'text' : type;

  const placeholderInput = type === 'password' ? (mostrarContraseña ? placeholder : '••••••••••') : placeholder;


  return (
    <div className='relative mb-8'>
      <div className='flex justify-between'>
        <label htmlFor={label} className="block text-sm font-bold dark:text-white">{label}</label>
        {showPasswordRecovery &&
          <a className='hidden sm:flex text-green-600 text-sm font-bold hover:underline' href="">{t("forgotPassword")}</a>
        }
      </div>
      {Icon && (
        <div>
          <Icon className="size-6 absolute left-4 top-9 text-black/50 dark:text-white/50" />
        </div>
      )}

      {type === 'password' && mostrarIcono && (mostrarContraseña ?
        <VisibilityOffIcon className="size-6 cursor-pointer absolute right-4 top-9 text-black/50 dark:text-white/50 hover:text-green-600" onMouseDown={(e) => {
          e.preventDefault();
          setmostrarContraseña(!mostrarContraseña);
        }}></VisibilityOffIcon>
        :
        <VisibilityIcon className="size-6 cursor-pointer absolute right-4 top-9 text-black/50 dark:text-white/50 hover:text-green-600" onMouseDown={(e) => {
          e.preventDefault();
          setmostrarContraseña(!mostrarContraseña);
        }}></VisibilityIcon>
      )}
      <input onBlur={() => setmostrarIcono(false)} onFocus={() => setmostrarIcono(true)} id={label} type={typeInput} className={`${type === 'password' ? "pr-15" : ""} ${Icon ? "pl-13" : ""} dark:border-gray-700 dark:bg-gray-700 dark:text-white w-full h-14 px-4 bg-background-light border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-600/20 focus:border-green-600 outline-none transition-all duration-200 text-[#101d0c] placeholder:text-gray-400`} placeholder={placeholderInput} value={value} onChange={onChange} />
      {showPasswordRecovery && (
        <a className='sm:hidden text-green-600 font-bold hover:underline' href="">{t("forgotPassword")}</a>
      )}
    </div>
  );
};

export default InputComponent;
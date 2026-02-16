import React, { useState } from 'react';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useTranslation } from "react-i18next";
import { useInfo } from '../../providers/InfoProvider.jsx';


export const InputComponent = ({
  placeholder = '',
  value,
  onChange,
  type = 'text',
  label = '',
  showPasswordRecovery = false,
  Icon,
  error = "",
  onPasswordRecoveryClick,
  name,
}) => {

  const { t } = useTranslation();

  const [mostrarContraseña, setmostrarContraseña] = useState(false);

  const [mostrarIcono, setmostrarIcono] = useState(false);

  const typeInput = type === 'password' && mostrarContraseña ? 'text' : type;

  const placeholderInput = type === 'password' ? (mostrarContraseña ? placeholder : '••••••••••') : placeholder;


  return (
    <div className='relative mb-8'>
      <div className='flex justify-between'>
        <label htmlFor={label} className="block text-sm font-bold text-ui-text">{label}</label>
        {showPasswordRecovery &&
          <a onClick={onPasswordRecoveryClick} className='hidden sm:flex text-brand-primary text-sm font-bold hover:underline cursor-pointer'>{t("forgotPassword")}</a>
        }
      </div>
      {Icon && (
        <div>
          <Icon className="size-6 absolute left-4 top-9 text-ui-text-secondary" />
        </div>
      )}

      {type === 'password' && mostrarIcono && (mostrarContraseña ?
        <EyeSlashIcon className="size-6 cursor-pointer absolute right-4 top-9 text-ui-text-secondary hover:text-brand-primary" onMouseDown={(e) => {
          e.preventDefault();
          setmostrarContraseña(!mostrarContraseña);
        }} />
        :
        <EyeIcon className="size-6 cursor-pointer absolute right-4 top-9 text-ui-text-secondary hover:text-brand-primary" onMouseDown={(e) => {
          e.preventDefault();
          setmostrarContraseña(!mostrarContraseña);
        }} />
      )}
      <input name={name} onBlur={() => setmostrarIcono(false)} onFocus={() => setmostrarIcono(true)} id={label} type={typeInput} className={`${type === 'password' ? "pr-15" : ""} ${Icon ? "pl-13" : ""} ${error ? "border-error" : "border-border-color"} bg-input-bg text-ui-text w-full h-14 px-4 border rounded-lg focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-none transition-all duration-200 placeholder:text-ui-text-secondary hover:bg-input-bg-hover`} placeholder={placeholderInput} value={value} onChange={onChange} />
      {error && (
        <p className='text-error text-sm'>{error}</p>
      )}
      {showPasswordRecovery && (
        <a className='sm:hidden text-brand-primary font-bold hover:underline' href="">{t("forgotPassword")}</a>
      )}
    </div>
  );
};

export default InputComponent;
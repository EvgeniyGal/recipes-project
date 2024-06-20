import { useState } from 'react';
import ErrorFormMessage from '../ErrorFormMessage';
import sprite from '../../../assets/icons/sprite.svg';
import cl from './input.module.scss';

const PasswordInput = ({ register, onBlur, autoComplete, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cl.input_container}>
      <input
        className={
          errors.password
            ? `${cl.input_form} ${cl.input_form__error}`
            : cl.input_form
        }
        type={showPassword ? 'text' : 'password'}
        placeholder="Password*"
        aria-label="Enter your password"
        autoComplete={autoComplete}
        {...register('password')}
        onBlur={() => onBlur()}
      />
      <button
        className={cl.toggle_password}
        type="button"
        onClick={() => setShowPassword(prev => !prev)}
      >
        <svg className={cl.toggle_icon} width={18} height={18}>
          <use href={`${sprite}#${showPassword ? 'eye' : 'eye_off'}`}></use>
        </svg>
      </button>
      {errors.password && (
        <ErrorFormMessage message={errors.password.message} />
      )}
    </div>
  );
};

export default PasswordInput;

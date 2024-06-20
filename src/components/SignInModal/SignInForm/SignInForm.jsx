import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { useLogInMutation } from '../../../redux/auth/AuthApi';
import { logInUser } from '../../../redux/auth/AuthSlice';
import TextInput from '../../ui/TextInput';
import PasswordInput from '../../ui/PasswordInput';
import SubmitButton from '../../ui/SubmitButton';
import ErrorFormMessage from '../../ui/ErrorFormMessage';
import cl from './signInForm.module.scss';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInForm = ({ onClose }) => {
  const [modalError, setModalError] = useState(null);
  const dispatch = useDispatch();
  const [logIn] = useLogInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      const result = await logIn(data).unwrap();
      dispatch(logInUser({ data: result }));
      toast.success(`Succesfully login`);
      onClose();
    } catch (error) {
      setModalError(error?.data?.message || 'An error occurred during login.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={cl.wrapper}>
        <TextInput
          type="email"
          placeholder="Email*"
          register={register}
          errors={errors}
          name="email"
          autoComplete="email"
          onBlur={() => trigger('email')}
        />
        <PasswordInput
          register={register}
          errors={errors}
          autoComplete="current-password webauthn"
          onBlur={() => trigger('password')}
        />
      </div>

      {modalError && (
        <ErrorFormMessage addClass={cl['custome-error']} message={modalError} />
      )}

      <SubmitButton disabled={!isValid}>Sign in</SubmitButton>
    </form>
  );
};

export default SignInForm;

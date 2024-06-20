import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../../redux/auth/AuthApi';
import { registerUser } from '../../../redux/auth/AuthSlice';

import TextInput from '../../ui/TextInput';
import PasswordInput from '../../ui/PasswordInput';
import SubmitButton from '../../ui/SubmitButton';

import ErrorFormMessage from '../../ui/ErrorFormMessage';
import cl from './signUpForm.module.scss';
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignUpForm = () => {
  const [modalError, setModalError] = useState(null);
  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const {
    register: formRegister,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = async data => {
    try {
      const result = await register(data).unwrap();
      dispatch(registerUser({ data: result }));
      toast.success(`Succesfully register`);
    } catch (error) {
      setModalError(error.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={cl.wrapper}>
        <TextInput
          type="text"
          placeholder="Name*"
          register={formRegister}
          errors={errors}
          name="name"
          autoComplete="username"
          onBlur={() => trigger('name')}
        />
        <TextInput
          type="email"
          placeholder="Email*"
          register={formRegister}
          errors={errors}
          name="email"
          autoComplete="email"
          onBlur={() => trigger('email')}
        />
        <PasswordInput
          register={formRegister}
          errors={errors}
          autoComplete="new-password"
          onBlur={() => trigger('password')}
        />
      </div>

      {modalError && (
        <ErrorFormMessage addClass={cl['custome-error']} message={modalError} />
      )}

      <SubmitButton disabled={!isValid}>Create</SubmitButton>
    </form>
  );
};

export default SignUpForm;

import cl from './input.module.scss';
import ErrorFormMessage from '../ErrorFormMessage';

const TextInput = ({
  type,
  placeholder,
  register,
  onBlur,
  autoComplete,
  errors,
  name,
}) => {
  return (
    <div className={cl.input_container}>
      <input
        className={
          errors[name]
            ? `${cl.input_form} ${cl.input_form__error}`
            : cl.input_form
        }
        type={type}
        placeholder={placeholder}
        aria-label={`Enter your ${name}`}
        {...register(name)}
        autoComplete={autoComplete}
        onBlur={() => onBlur()}
      />
      {errors[name] && <ErrorFormMessage message={errors[name].message} />}
    </div>
  );
};

export default TextInput;

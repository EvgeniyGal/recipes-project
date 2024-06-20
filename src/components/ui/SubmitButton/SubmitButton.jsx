import cl from './button.module.scss';

const SubmitButton = ({ onSubmit, addClass = '', children, disabled }) => {
  return (
    <button
      type="submit"
      className={addClass ? `${cl.submit} ${addClass}` : cl.submit}
      onSubmit={onSubmit}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default SubmitButton;

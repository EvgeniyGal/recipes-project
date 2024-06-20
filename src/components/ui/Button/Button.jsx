import cl from './button.module.scss';

const Button = ({
  onClick,
  addClass = '',
  type = 'button',
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={addClass ? `${cl.button} ${addClass}` : cl.button}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

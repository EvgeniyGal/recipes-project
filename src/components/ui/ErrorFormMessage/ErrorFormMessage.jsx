import PropTypes from 'prop-types';
import cl from './errorFormMessage.module.scss';

const ErrorFormMessage = ({ message, addClass }) => {
  return (
    <p className={addClass ? `${cl.error} ${addClass}` : cl.error}>{message}</p>
  );
};

ErrorFormMessage.propTypes = {
  message: PropTypes.string.isRequired,
  addClass: PropTypes.string,
};
export default ErrorFormMessage;

import cl from './buttonIcon.module.scss';
import Icon from '../Icon';
import PropTypes from 'prop-types';

const ButtonIcon = ({ onClick, addClass = '', icon, isActive }) => {
  return (
    <button
      type="button"
      className={`
      ${cl['button-icon']} ${addClass} ${isActive ? cl.active : ''}
      `}
      onClick={onClick}
    >
      <Icon icon={icon} />
    </button>
  );
};

ButtonIcon.propTypes = {
  onClick: PropTypes.func.isRequired,
  addClass: PropTypes.string,
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
};

export default ButtonIcon;

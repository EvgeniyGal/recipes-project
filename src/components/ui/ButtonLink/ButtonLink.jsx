import cl from './buttonLink.module.scss';
import Icon from '../Icon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function ButtonLink({
  to,
  addClass = '',
  onClick = () => {},
  icon,
  children,
}) {
  return (
    <Link
      className={`${cl['button-link']} ${addClass}`}
      to={to}
      onClick={onClick}
    >
      {icon && <Icon icon={icon} />}

      {children}
    </Link>
  );
}

ButtonLink.propTypes = {
  to: PropTypes.string.isRequired,
  addClass: PropTypes.string,
  icon: PropTypes.string,
  children: PropTypes.node,
  onCLick: PropTypes.func,
};

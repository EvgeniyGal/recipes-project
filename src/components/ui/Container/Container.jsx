import PropTypes from 'prop-types';
import cl from './container.module.scss';

const Container = ({ children, addClass = '' }) => {
  return <div className={`container ${addClass}`}>{children}</div>;
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;

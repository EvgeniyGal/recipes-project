import PropTypes from 'prop-types';
import cl from './subtitle.module.scss';

const Subtitle = ({ addClass, children }) => {
  return (
    <p className={addClass ? `${cl.subtitle} ${addClass}` : cl.subtitle}>
      {children}
    </p>
  );
};

Subtitle.propTypes = {
  children: PropTypes.node.isRequired,
  addClass: PropTypes.string,
};

export default Subtitle;

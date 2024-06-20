import PropTypes from 'prop-types';
import cl from './title.module.scss';

const Title = ({ children, addClass }) => {
  return (
    <h3 className={addClass ? `${cl.title} ${addClass}` : cl.title}>
      {children}
    </h3>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  addClass: PropTypes.string,
};

export default Title;

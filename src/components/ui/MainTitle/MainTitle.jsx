import PropTypes from 'prop-types';
import cl from './mainTitle.module.scss';

const MainTitle = ({ addClass, children }) => {
  return (
    <h2 className={addClass ? `${cl.title} ${addClass}` : cl.title}>
      {children}
    </h2>
  );
};
MainTitle.propTypes = {
  children: PropTypes.node.isRequired,
  addClass: PropTypes.string,
};

export default MainTitle;

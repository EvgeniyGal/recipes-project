import PropTypes from 'prop-types';
import cl from './secondTitle.module.scss';

const SecondTitle = ({ addClass, children }) => {
  return (
    <h2 className={addClass ? `${cl.title} ${addClass}` : cl.title}>
      {children}
    </h2>
  );
};
SecondTitle.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SecondTitle;

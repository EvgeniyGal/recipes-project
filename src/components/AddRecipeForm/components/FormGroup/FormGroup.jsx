import PropTypes from 'prop-types';
import Title from '../../../ui/Title';
import cl from './formGroup.module.scss';
import ErrorFormMessage from '../../../ui/ErrorFormMessage';

const FormGroup = ({ label = '', error, children, addClass }) => {
  const customeStyleRule = label === 'The name of the recipe';

  return (
    <div className={`${cl['form-group']} ${addClass}`}>
      {label ? (
        <Title addClass={customeStyleRule ? cl.light : null}>{label}</Title>
      ) : null}
      {children}
      {error && (
        <ErrorFormMessage addClass={cl['custome-error']} message={error} />
      )}
    </div>
  );
};

FormGroup.propTypes = {
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  children: PropTypes.node.isRequired,
  addClass: PropTypes.string,
};

export default FormGroup;

import Button from '../ui/Button';
import SecondTitle from '../ui/SecondTitle';
import SignInForm from './SignInForm';
import cl from './signInModal.module.scss';

const SignInModal = ({ onClose, setModalType }) => {
  const handleSignClick = () => {
    setModalType('SignUpModal');
  };

  return (
    <>
      <SecondTitle>Sign in</SecondTitle>
      <SignInForm onClose={onClose} />
      <div className={cl.footer}>
        <p>Don't have an account?</p>
        <Button onClick={handleSignClick}> Create an account</Button>
      </div>
    </>
  );
};

export default SignInModal;

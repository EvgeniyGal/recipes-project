import { useState } from 'react';
import Modal from '../../ui/Modal';
import cl from './authBar.module.scss';

const AuthBar = () => {
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeBtn, setActiveBtn] = useState('signIn'); // ['signIn', 'signUp']

  const setSignInActive = () => {
    setActiveBtn('signIn');
    toggleModal('SignInModal');
  };

  const setSignUpActive = () => {
    setActiveBtn('signUp');
    toggleModal('SignUpModal')
  };

  const toggleModal = type => {
    setModalType(type);
    setShowModal(!showModal);
  };

  return (
    <div className={cl.authBtns}>
      <span className={`${cl.activeBtn} ${ activeBtn === 'signIn' ? '' : cl.active}`}></span>
      <button className={`${ activeBtn === 'signIn' ? cl.activeAuth : ''}`} onClick={() => setSignInActive()}>Sign In</button>
      <button className={`${ activeBtn === 'signUp' ? cl.activeAuth : ''}`} onClick={() => setSignUpActive()}>Sign Up</button> 
      
      {showModal && <Modal onClose={toggleModal} type={modalType} />}
    </div>
  );
};

export default AuthBar;

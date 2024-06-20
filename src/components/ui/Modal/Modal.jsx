import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { enableBodyTabbing, disableBodyTabbing } from '../../../utils/tabindex';
import LogOutModal from '../../LogOutModal';
import SignUpModal from '../../SignUpModal';
import SignInModal from '../../SignInModal';
import Button from '../Button';
import sprite from '../../../assets/icons/sprite.svg';
import cl from './modal.module.scss';
import Icon from '../Icon';

const Modal = ({ onClose, type = 'LogOutModal' }) => {
  //type = 'LogOutModal', 'SignUpModal', 'SignInModal'

  const [modalType, setModalType] = useState(type);
  const [modalHeight, setModalHeight] = useState(0);
  const [show, setShow] = useState(true);
  const modalRef = useRef(null);

  const { user } = useSelector(state => state.authSlice);

  const closeWithAnimation = () => {
    setShow(false);
    setTimeout(() => {
      enableBodyTabbing(modalRef);
      onClose();
    }, 350);
  };

  const handleEscape = event => {
    if (event.key === 'Escape') {
      closeWithAnimation();
    }
  };

  const handleClickOutside = event => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      closeWithAnimation();
    }
  };

  useEffect(() => {
    const updateModalHeight = () => {
      setModalHeight(window.innerHeight);
    };

    updateModalHeight();
    window.addEventListener('resize', updateModalHeight);

    return () => {
      window.removeEventListener('resize', updateModalHeight);
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape, false);
    document.addEventListener('mousedown', handleClickOutside, false);

    document.body.style.paddingRight = `${
      window.innerWidth - document.documentElement.offsetWidth
    }px`;
    document.body.style.overflow = 'hidden';

    disableBodyTabbing(modalRef);

    return () => {
      document.removeEventListener('keydown', handleEscape, false);
      document.removeEventListener('mousedown', handleClickOutside, false);
      document.body.style.overflow = 'auto';
      document.body.style.paddingRight = '0';
    };
  }, []);

  const isLogOutModal = type === 'LogOutModal';
  const isSignUpModal = type === 'SignUpModal';

  return createPortal(
    <div
      className={`${cl.wrapper} ${modalHeight < 600 ? cl.wrapper_scroll : ''} ${
        show && cl.wrapper_show
      }`}
    >
      <div
        className={`${cl.modal} ${show ? cl.modal_show : ''}`}
        ref={modalRef}
      >
        {modalType === 'SignUpModal' && (
          <SignUpModal setModalType={setModalType} />
        )}
        {modalType === 'SignInModal' && (
          <SignInModal
            onClose={closeWithAnimation}
            setModalType={setModalType}
          />
        )}
        {modalType === 'LogOutModal' && (
          <LogOutModal onClose={closeWithAnimation} />
        )}

        {(isLogOutModal || (user?.name && isSignUpModal)) && (
          <Button addClass={cl.cancel_button} onClick={closeWithAnimation}>
            {isLogOutModal && `Cancel`}
            {isSignUpModal && `Close`}
          </Button>
        )}
        <button
          className={cl.close_button}
          aria-label="Close modal window"
          onClick={closeWithAnimation}
        >
          <Icon icon="close" addClass={cl.close_icon} width={24} height={24} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Modal;

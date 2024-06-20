import cl from './userBar.module.scss';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../ui/Modal';
import Icon from '../../ui/Icon';
import { useFetchCurrentUserQuery } from '../../../redux/auth/AuthApi';

const UserBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { data: user, isSuccess } = useFetchCurrentUserQuery();

  const navigate = useNavigate();
  const menuRef = useRef(null); // Ref for the user menu

  const toggleModal = type => {
    setModalType(type);
    setShowModal(!showModal);
  };

  const handleProfileClick = () => {
    if (user) {
      navigate(`/user/${user._id}`);
      setIsMenuOpen(false);
    }
  };

  const handleLogoutClick = () => {
    toggleModal();
    setIsMenuOpen(false);
  };

  const handleUserInfoClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle clicks outside of the user menu
  useEffect(() => {
    const handleClickOutside = event => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className={cl.userBar} ref={menuRef}>
      <div className={cl.userInfo} onClick={handleUserInfoClick}>
        <img
          className={cl.avatar}
          src={user?.avatar || '/images/user/avatar-3814049_640.webp'}
          alt="User avatar"
        />
        <div className={cl.name}>
          <span className={cl.username}>{user?.name}</span>
          <svg
            className={`${isMenuOpen ? cl.active : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
          >
            <path
              d="M4.5 11.25L9 6.75L13.5 11.25"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      <ul className={`${cl.menu} ${isMenuOpen ? cl.active : ''}`}>
        <li className={cl.menuItem}>
          <button
            className={cl.menuLink}
            type="button"
            onClick={handleProfileClick}
          >
            Profile
          </button>
        </li>
        <li className={cl.menuItem}>
          <button
            className={cl.menuLink}
            type="button"
            onClick={handleLogoutClick}
          >
            <span>Log out</span>
            <Icon
              icon="arrow_up_right"
              width={18}
              height={18}
              addClass={cl.icon}
            />
          </button>
        </li>
      </ul>
      {showModal && <Modal onClose={toggleModal} type={modalType} />}
    </div>
  );
};

export default UserBar;

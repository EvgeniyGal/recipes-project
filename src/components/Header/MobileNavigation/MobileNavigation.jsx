import { useState } from 'react';
import cl from './mobileNavigation.module.scss';
import { NavLink, useLocation } from 'react-router-dom';
import Logo from '../../ui/Logo';
const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const handleToggle = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'visible';
  };

  return (
    <nav className={cl.mobileNavigation}>
      <div
        className={`${cl.burgerMenu} ${isOpen ? cl.open : ''}
        ${
          location.pathname === '/' || location.pathname.includes('/categories')
            ? ''
            : cl.black
        }`}
        onClick={handleToggle}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
        >
          <path
            d="M24.5 7H3.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.5 11.6665H3.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.5 16.3335H3.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M24.5 21H3.5"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className={`${cl.menuItems} ${isOpen ? cl.open : ''}`}>
        <div className={cl.topElements}>
          <Logo />
          <button className={cl.closeBtn} onClick={handleToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <path
                d="M21 7L7 21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 7L21 21"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <ul className={cl.menuWrapper}>
          <li>
            <NavLink onClick={handleToggle} to="/" className={cl.active}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleToggle}
              to="recipe/add"
              className={cl.active}
            >
              Add Recipe
            </NavLink>
          </li>
        </ul>
        <div className={cl.imgContainer}>
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero/desert@1x.jpg"
            />
            <source
              media="(min-width: 769px)"
              srcSet="/images/hero/desert@2x.jpg"
            />
            <img
              className={cl.firstImg}
              src="/images/hero/desert.jpg"
              alt="desert"
            />
          </picture>
          <picture>
            <source
              media="(max-width: 768px)"
              srcSet="/images/hero/meat-and-vine@1x.jpg"
            />
            <source
              media="(min-width: 769px)"
              srcSet="/images/hero/meat-and-vine@2x.jpg"
            />
            <img
              className={cl.lastImg}
              src="/images/hero/meat-and-vine.jpg"
              alt="meat and bottle of vine"
            />
          </picture>
        </div>
      </div>
    </nav>
  );
};
export default MobileNavigation;

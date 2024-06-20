import Logo from '../ui/Logo';
import AuthBar from './AuthBar';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';
import UserBar from './UserBar';
import cl from './header.module.scss';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useScreenSize from './hooks/useScreenSize';
import BREAKPOINTS from '../../assets/constants/breakpoints';

const Header = () => {
  const [isMobile, setIsMobile] = useState(true);
  const { MOBILE_MAX } = BREAKPOINTS;
  const { width } = useScreenSize();
  const { isLoggedIn } = useSelector(state => state.authSlice);
  const mobileMaxNum = Number.parseFloat(MOBILE_MAX);

  useEffect(() => {
    if (isMobile !== width < mobileMaxNum) {
      setIsMobile(width < mobileMaxNum);
    }
  }, [width, mobileMaxNum, isMobile]);

  const location = useLocation();
  const isMainLocation =
    location.pathname === '/' || location.pathname.includes('/categories');
  const isWhiteHeader =
    location.pathname === '/' || location.pathname.includes('/categories');

  return (
    <header className={`${cl.header} ${isWhiteHeader ? '' : cl.black}`}>
      <Logo />

      {isLoggedIn ? (
        isMobile ? (
          <div className={cl.mobile}>
            {isLoggedIn && <UserBar />}
            {!isMainLocation && <MobileNavigation />}
          </div>
        ) : (
          <>
            {!isMainLocation && <Navigation />}
            {isLoggedIn && <UserBar />}
          </>
        )
      ) : (
        <AuthBar />
      )}
    </header>
  );
};

export default Header;

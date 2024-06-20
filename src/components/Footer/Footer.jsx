import Logo from '../ui/Logo';
import Copyright from './Copyright';
import NetworkLinks from './NetworkLinks';
import cl from './footer.module.scss';

const Footer = () => {
  return (
    <div className={cl.footer_wrapper}>
      <div className={cl.footer_logo_wrapper}>
        <Logo />
        <NetworkLinks />
      </div>
      <div className={cl.footer_underline}></div>
      <Copyright />
    </div>
  );
};

export default Footer;

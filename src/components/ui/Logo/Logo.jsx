import cl from './logo.module.scss';

const Logo = () => {
  return (
    <a
      href="/"
      aria-label="Home Page"
      title="Go to Home Page"
      rel="noopener noreferrer"
      className={cl.logo}
    >
      foodies
    </a>
  );
};

export default Logo;

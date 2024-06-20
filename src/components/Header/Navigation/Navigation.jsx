import cl from './navigation.module.scss';
import { NavLink, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  return (
    <nav className={cl.nav}>
      <NavLink className={cl.link} to="/" state={{ from: location }}>
        Home
      </NavLink>
      <NavLink
        className={`${cl.link} ${
          location.pathname === '/recipe/add' ? cl.active : ''
        }`}
        to="recipe/add"
        state={{ from: location }}
      >
        Add Recipe
      </NavLink>
    </nav>
  );
};

export default Navigation;

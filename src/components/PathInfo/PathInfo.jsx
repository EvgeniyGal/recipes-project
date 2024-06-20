import { Link, useLocation, useParams } from 'react-router-dom';
import { useGetRecipeByIdQuery } from '../../redux/recipes/recipesApi';
import cl from './pathInfo.module.scss';

const PathInfo = () => {
  const location = useLocation();
  const { recipeId } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery({ id: recipeId });
  const path = location.pathname;

  const generateBreadcrumb = () => {
    if (path === '/recipe/add') {
      return 'Add recipe';
    }
    if (path.startsWith('/recipe/')) {
      return recipe?.title;
    }
    if (path.startsWith('/user')) {
      return 'Profile';
    }
  };

  return (
    <div className={cl.breadcrumb}>
      <Link to="/" className={cl['home-link']}>
        Home
      </Link>
      <span>/</span>

      <p className={cl.link}>{generateBreadcrumb()}</p>
    </div>
  );
};

export default PathInfo;

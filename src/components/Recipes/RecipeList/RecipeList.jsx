import RecipeCard from '../RecipeCard/RecipeCard';
import cl from './recipeList.module.scss';
import PropTypes from 'prop-types';

const RecipeList = ({ recipeList }) => {
  return (
    <ul className={cl.recipeList}>
      {recipeList.map(item => {
        return <RecipeCard key={item._id} recipe={item} />;
      })}
    </ul>
  );
};

RecipeList.propTypes = {
  recipeList: PropTypes.arrayOf(PropTypes.object),
};

export default RecipeList;

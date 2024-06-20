import { useParams } from 'react-router-dom';
import cl from './recipeIngredients.module.scss';
import { useGetRecipeByIdQuery } from '../../../redux/recipes/recipesApi';

import IngredientCard from '../../IngredientCard';

const RecipeIngredients = () => {
  const { recipeId } = useParams();
  const { data: recipe } = useGetRecipeByIdQuery({ id: recipeId });
  return (
    <div className={cl.container}>
      <h2 className={cl.title}>Ingredients</h2>
      <ul className={cl.list}>
        {recipe?.ingredients.map(
          ({ ingredient: { _id, img, name }, measure }) => (
            <IngredientCard
              key={_id}
              id={_id}
              img={img}
              name={name}
              measure={measure}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default RecipeIngredients;

import { useParams } from 'react-router-dom';
import cl from './recipePreparation.module.scss';
import { useGetRecipeByIdQuery } from '../../../redux/recipes/recipesApi';

const RecipePreparation = () => {
  const { recipeId } = useParams();

  const { data: recipe } = useGetRecipeByIdQuery({ id: recipeId });
  const textParagraph = recipe?.instructions
    ? recipe.instructions.split('\n')
    : [];
  return (
    <div className={cl['prep-container']}>
      <h2 className={cl.title}>Recipe Preparation</h2>
      {textParagraph.map((paragraph, index) => (
        <p key={index} className={cl.text}>
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default RecipePreparation;

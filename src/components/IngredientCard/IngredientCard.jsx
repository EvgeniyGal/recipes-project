/* eslint-disable react/prop-types */
import sprite from '../../assets/icons/sprite.svg';
import cl from './ingredientCard.module.scss';

const IngredientCard = ({ id, img, name, measure, removeIngredient }) => {
  return (
    <li key={id} className={cl.ingredient}>
      <img src={img} />
      <div className={cl['ingredient-info']}>
        <p>{name}</p>
        <span>{measure}</span>
        {removeIngredient && (
          <button type="button" onClick={() => removeIngredient(id)}>
            <svg width={16} height={16}>
              <use href={`${sprite}#close`}></use>
            </svg>
          </button>
        )}
      </div>
    </li>
  );
};

export default IngredientCard;

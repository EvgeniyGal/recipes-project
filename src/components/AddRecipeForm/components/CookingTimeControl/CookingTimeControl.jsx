import PropTypes from 'prop-types';
import sprite from '../../../../assets/icons/sprite.svg';
import cl from './cookingTimeControl.module.scss';

const CookingTimeControl = ({ value, onDecrement, onIncrement }) => {
  return (
    <div className={cl['cooking-time']}>
      <button type="button" onClick={onDecrement}>
        <svg width={16} height={16}>
          <use href={`${sprite}#minus`}></use>
        </svg>
      </button>
      <span>{value} minutes</span>
      <button type="button" onClick={onIncrement}>
        <svg width={16} height={16}>
          <use href={`${sprite}#plus`}></use>
        </svg>
      </button>
    </div>
  );
};

CookingTimeControl.propTypes = {
  value: PropTypes.number.isRequired,
  onDecrement: PropTypes.func.isRequired,
  onIncrement: PropTypes.func.isRequired,
};

export default CookingTimeControl;

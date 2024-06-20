import sprite from '../../../assets/icons/sprite.svg';
import cl from './icon.module.scss';

const Icon = ({ icon = 'star', width = 16, height = 16, addClass = '' }) => {
  return (
    <svg className={`${addClass}`} width={width} height={height}>
      <use href={`${sprite}#${icon}`}></use>
    </svg>
  );
};

export default Icon;

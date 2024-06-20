import cl from './skeletonSelect.module.scss';

const SkeletonSelect = () => {
  return (
    <div className={`${cl.selectWrapper} ${cl.skeleton}`}>
      <button className={cl.selectButton} disabled>
        <span className={`${cl.selectValue} ${cl.skeletonText}`}>
          <div className={cl.skeletonTextWrapper}></div>
        </span>
        <span>
          <svg className={cl.arrow}>
            <use href="/src/assets/icons/sprite.svg#chevron_down"></use>
          </svg>
        </span>
      </button>
    </div>
  );
};

export default SkeletonSelect;

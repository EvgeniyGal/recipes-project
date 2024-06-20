import cl from './skeletonRecipeCard.module.scss';

const SkeletonRecipeCard = () => {
  return (
    <>
      <li className={cl.recipeItem}>
        <div className={`${cl.recipeImg} ${cl.skeleton}`}></div>
        <div className={cl.recipeTitle}>
          <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
        </div>
        <div className={cl.recipeText}>
          <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
          <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
        </div>
        <div className={cl.recipeExtra}>
          <div className={cl.recipeOwner}>
            <div className={`${cl.skeleton} ${cl.skeletonIcon}`}></div>
            <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
          </div>
          <div className={cl.recipeButtons}>
            <div className={`${cl.skeleton} ${cl.skeletonIcon}`}></div>
            <div className={`${cl.skeleton} ${cl.skeletonIcon}`}></div>
          </div>
        </div>
      </li>
    </>
  );
};

export default SkeletonRecipeCard;

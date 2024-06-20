import cl from './recipePreview.module.scss';
const RecipePreviewSkeleton = () => (
  <div className={cl.skeletonContainer}>
    <div className={cl.skeletonWrapper}>
      <div className={`${cl.skeleton} ${cl.skeletonImage}`}></div>
      <div className={cl.skeletonTextTitleWrapper}>
        <div className={`${cl.skeleton} ${cl.skeletonTitle}`}></div>
        <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
        <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
      </div>
    </div>
    <ul className={cl.listButton}>
      <button className={`${cl.skeleton} ${cl.skeletonButton}`}></button>
      <button className={`${cl.skeleton} ${cl.skeletonButton}`}></button>
    </ul>
  </div>
);

export default RecipePreviewSkeleton;

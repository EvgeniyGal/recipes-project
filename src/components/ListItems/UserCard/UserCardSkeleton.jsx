import cl from './userCard.module.scss';

const UserCardSkeleton = () => (
  <div className={cl.userCardSkeletonContainer}>
    <div className={cl.userCardSkeletonWrapper}>
      <div className={`${cl.skeleton} ${cl.skeletonImage}`}></div>
      <div className={cl.userDetails}>
        <div className={`${cl.skeleton} ${cl.skeletonTitle}`}></div>
        <div className={`${cl.skeleton} ${cl.skeletonText}`}></div>
        <div className={`${cl.skeleton} ${cl.skeletonButton}`}></div>
      </div>
      <div className={`${cl.skeletonListImages}`}>
        <div className={`${cl.skeleton} ${cl.skeletonResImage}`}></div>
        <div className={`${cl.skeleton} ${cl.skeletonResImage}`}></div>
        <div className={`${cl.skeleton} ${cl.skeletonResImage}`}></div>
        </div>
      
    </div>
    <div className={`${cl.skeleton} ${cl.skeletonButton}`}></div>
  </div>
);
export default UserCardSkeleton;

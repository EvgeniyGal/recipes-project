import PropTypes from 'prop-types';

import { TypeOfCard, TypeOfList } from './constants';

import cl from './listItems.module.scss';
import RecipePreview from './RecipePreview/RecipePreview';
import UserCard from './UserCard/UserCard';
import UserCardSkeleton from './UserCard/UserCardSkeleton';
import RecipePreviewSkeleton from './RecipePreview/RecipePreviewSkeleton';

const skeleton = new Array(6);
const ListItems = ({
  data = [],
  isLoading,
  typeOfCard = '',
  typeOfList = '',
}) => {
  if (isLoading) {
    return (
      <div className={cl.listWrapper}>
        {typeOfCard === TypeOfCard.RecipeCard
          ? skeleton.map((_, index) => <RecipePreviewSkeleton key={index} />)
          : skeleton.map((_, index) => <UserCardSkeleton key={index} />)}
      </div>
    );
  }
  return (
    <ul className={cl.listWrapper}>
      {data.map(cardData => {
        return typeOfCard === TypeOfCard.RecipeCard ? (
          <RecipePreview
            key={cardData._id}
            isLoading={isLoading}
            cardData={cardData}
            typeOfList={typeOfList}
          />
        ) : (
          <UserCard
            key={cardData._id}
            isLoading={isLoading}
            cardData={cardData}
            typeOfList={typeOfList}
          />
        );
      })}
    </ul>
  );
};

ListItems.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  isLoading: PropTypes.bool,
  typeOfCard: PropTypes.oneOf(Object.values(TypeOfCard)),
  typeOfList: PropTypes.oneOf(Object.values(TypeOfList)),
};

export default ListItems;

import { useNavigate, useParams } from 'react-router-dom';
import RecipeIngredients from './RecipeIngredients';
import RecipePreparation from './RecipePreparation';
import { useGetRecipeByIdQuery } from '../../redux/recipes/recipesApi';
import cl from './recipeInfo.module.scss';
import Button from '../ui/Button';
import {
  useAddRecipeToFavoritesListMutation,
  useFetchCurrentUserQuery,
  useRemoveRecipeFromFavoritesListMutation,
} from '../../redux/auth/AuthApi';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Modal from '../ui/Modal';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const RecipeInfo = () => {
  const { recipeId } = useParams();
  const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
  const { data: userData } = useFetchCurrentUserQuery(null, {
    skip: !isLoggedIn,
  });

  const reqData = {
    id: recipeId,
    userId: userData ? userData._id : null,
  };

  const {
    data: recipe,
    isLoading,
    isError,
    error,
  } = useGetRecipeByIdQuery(reqData);
  const isFavorite = recipe?.isFavorite;

  const [favorite, setFavorite] = useState(isFavorite);
  const modalType = 'SignInModal';
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const [addRecipeToFavoritesList] = useAddRecipeToFavoritesListMutation();
  const [removeRecipeFromFavoritesList] =
    useRemoveRecipeFromFavoritesListMutation();

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavorite = () => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    if (!favorite) {
      setFavorite(true);
      addRecipeToFavoritesList(recipeId);
    } else {
      setFavorite(false);
      removeRecipeFromFavoritesList(recipeId);
    }
  };

  const navigate = useNavigate();
  const handleOwnerClick = ownerId => {
    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }
    navigate(`/user/${ownerId}`);
  };

  return (
    <>
      {showModal && <Modal onClose={toggleModal} type={modalType} />}

      <div className={cl.container}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <img src={recipe?.thumb} alt={recipe?.title} className={cl.image} />
        )}
        <div>
          <h1 className={cl.title}>
            {isLoading ? <Skeleton /> : recipe?.title}
          </h1>
          <div className={cl['feature-container']}>
            <p className={cl.feature}>
              {isLoading ? <Skeleton /> : recipe?.category.name}
            </p>
            <p className={cl.feature}>
              {' '}
              {isLoading ? <Skeleton /> : recipe?.time} min
            </p>
          </div>
          <p className={cl.description}>
            {isLoading ? <Skeleton /> : recipe?.description}
          </p>
          <Button onClick={() => handleOwnerClick(recipe?.owner?._id)}>
            <div className={cl['owner-container']}>
              {isLoading ? (
                <Skeleton />
              ) : (
                <img
                  src={
                    recipe?.owner?.avatar
                      ? recipe?.owner?.avatar
                      : '/images/user/avatar-3814049_640.webp'
                  }
                  alt={recipe?.owner?.name}
                  className={cl['owner-image']}
                />
              )}
              <p>
                <span className={cl['owner-title']}>Created by:</span>
                <span className={cl['owner-name']}>
                  {isLoading ? <Skeleton /> : recipe?.owner?.name}
                </span>
              </p>
            </div>
          </Button>
          <RecipeIngredients />
          <RecipePreparation />
          <Button
            onClick={() => {
              handleFavorite();
            }}
            addClass={cl.button}
          >
            {favorite ? 'REMOVE FROM FAVORITES' : 'ADD TO FAVORITES'}
          </Button>
        </div>
      </div>

      {isError && (
        <p className={cl['error-msg']}>{`Error: ${error.message}`}</p>
      )}
    </>
  );
};

export default RecipeInfo;

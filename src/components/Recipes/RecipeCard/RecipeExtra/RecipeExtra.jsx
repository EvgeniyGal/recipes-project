import ButtonLink from '../../../ui/ButtonLink';
import cl from './recipeExtra.module.scss';
import PropTypes from 'prop-types';
import ButtonIcon from '../../../ui/ButtonIcon';
import authApi from '../../../../redux/auth/AuthApi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../../../ui/Modal';
import scrollUpToSection from '../../../../utils/scrollUpToSection';

const DEFAULT_AVATAR = '/images/user/avatar-3814049_640.webp';
const RecipeExtra = ({
  owner: { _id, name, avatar },
  recipeId,
  isFavorite,
}) => {
  const [favorite, setFavorite] = useState(false);
  const [addRecipeToFavoritesList] =
    authApi.useAddRecipeToFavoritesListMutation();
  const [removeRecipeFromFavoritesList] =
    authApi.useRemoveRecipeFromFavoritesListMutation();
  const { isLoggedIn } = useSelector(state => state.authSlice);
  const modalType = 'SignInModal';
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleFavorite = ({ target }) => {
    target.blur();
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

  const handleButtonClick = e => {
    if (!isLoggedIn) {
      e.preventDefault();
      setShowModal(true);
    }
  };

  const handleScrollUp = () => {
    if (window.location.pathname.includes('/recipe')) {
      scrollUpToSection('header');
    }
  };

  return (
    <>
      {showModal && <Modal onClose={toggleModal} type={modalType} />}
      <div className={cl.recipeExtra}>
        <div className={cl.recipeOwner}>
          <ButtonLink
            to={`/user/${_id}`}
            onClick={handleButtonClick}
            addClass={cl.recipeOwner}
          >
            <img
              className={`${cl.recipeOwnerImg} ${cl.skeleton}`}
              src={avatar ? avatar : DEFAULT_AVATAR}
              alt={name}
            />
          </ButtonLink>
          <h4 className={cl.recipeOwnerName}>{name}</h4>
        </div>
        <div className={cl.recipeButtons} data-id={recipeId}>
          <ButtonIcon
            icon="heart"
            isActive={favorite}
            onClick={handleFavorite}
          ></ButtonIcon>
          <ButtonLink
            to={`/recipe/${recipeId}`}
            icon="arrow_up_right"
            onClick={handleScrollUp}
            addClass={cl.recipeLink}
          ></ButtonLink>
        </div>
      </div>
    </>
  );
};

RecipeExtra.propTypes = {
  owner: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    avatar: PropTypes.string,
    name: PropTypes.string.isRequired,
  }).isRequired,
  recipeId: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool,
  url: PropTypes.string,
};

export default RecipeExtra;

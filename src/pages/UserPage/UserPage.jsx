import PathInfo from '../../components/PathInfo/PathInfo';
import TabsList from '../../components/TabsList';
import Button from '../../components/ui/Button';
import MainTitle from '../../components/ui/MainTitle';
import Subtitle from '../../components/ui/Subtitle/Subtitle';
import { useDispatch, useSelector } from 'react-redux';
import {
  useFetchCurrentUserQuery,
  useGetFavoriteRecipesListQuery,
  useGetFollowersQuery,
  useGetFollowingsQuery,
  useGetUserByIdQuery,
  useUpdateAvatarMutation,
  useAddUserToFollowingListMutation,
  useRemoveUserFromFollowingListMutation,
} from '../../redux/auth/AuthApi.jsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import { updateUserAvatar } from '../../redux/auth/AuthSlice.jsx';
import cl from './userPage.module.scss';
import Icon from '../../components/ui/Icon/index.js';
import Container from '../../components/ui/Container/index.js';
import ListItems from '../../components/ListItems/index.js';
import {
  useGetUserRecipesQuery,
  useGetOwnRecipesMutation,
} from '../../redux/recipes/recipesApi.jsx';
import { Navigate, useParams } from 'react-router-dom';
import useScrollToTop from '../../utils/scrollToTop';
import ErrorFormMessage from '../../components/ui/ErrorFormMessage';
import Modal from '../../components/ui/Modal';
import ListPagination from '../../components/ListPagination';
import { toast } from 'react-toastify';

const LIMIT_RECIPES = 9;
const LIMIT_FOLLOW = 5;

const UserPage = () => {
  useScrollToTop();
  const [currentPage, setCurrentPage] = useState(1);
  const { userId } = useParams();
  const [favoriteRecipes, setFavoriteRecipes] = useState(null);
  const [ownRecipes, setOwnRecipes] = useState(null);
  const [otherUserRecipes, setOtherUserRecipes] = useState(null);
  const [followers, setFollowers] = useState(null);
  const [followings, setFollowings] = useState(null);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();
  const { token } = useSelector(state => state.authSlice);
  const [updateAvatar] = useUpdateAvatarMutation();

  const [addUserToFollowingList] = useAddUserToFollowingListMutation();

  const [removeUserFromFollowingList] =
    useRemoveUserFromFollowingListMutation();
  const [isLogOutModalOpen, setIsLogOutModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('My recipes');

  const [isCurrentUser, setIsCurrentUser] = useState(false);
  const [modalType, setModalType] = useState(null);

  const {
    data: currentUser,
    error: currentUserError,
    isLoading: isLoadingCurrentUser,
    isSuccess: isSuccessCurrentUser,
  } = useFetchCurrentUserQuery();

  const {
    data: userData,
    error: userError,
    isLoading: isLoadingUser,
    isSuccess: isSuccessUser,
  } = useGetUserByIdQuery(userId);
  const { data: personalRecipesResp, isLoading: isLoadingPersonalRecipes } =
    useGetOwnRecipesMutation(
      { page: currentPage, limit: LIMIT_RECIPES },
      { skip: !isCurrentUser }
    );

  const { data: favoriteRecipesResp, isLoading: isLoadingFavoriteRecipes } =
    useGetFavoriteRecipesListQuery(
      { page: currentPage, limit: LIMIT_RECIPES, id: userId },
      {
        skip: !isCurrentUser || activeTab !== 'My favorites',
      }
    );

  const { data: followingResp, isLoading: isLoadingFollowing } =
    useGetFollowingsQuery(userId, {
      skip: !isCurrentUser && activeTab !== 'Following',
    });

  const { data: followersResp, isLoading: isLoadingFollowers } =
    useGetFollowersQuery(
      { id: userId, page: currentPage, limit: LIMIT_FOLLOW },
      {
        skip: activeTab !== 'Followers',
      }
    );

  const { data: externalUserRecipes, isLoading: isLoadingExternalUserRecipes } =
    useGetUserRecipesQuery(
      { id: userId, page: currentPage, limit: LIMIT_RECIPES },
      { skip: activeTab !== 'Recipes' && activeTab !== 'My recipes' }
    );

  useEffect(() => {
    setIsCurrentUser(currentUser?._id === userId);
  }, [currentUser, userId]);

  useEffect(() => {
    setActiveTab(isCurrentUser ? 'My recipes' : 'Recipes');
  }, [isCurrentUser]);

  useEffect(() => {
    if (activeTab === 'My favorites') {
      setFavoriteRecipes(favoriteRecipesResp);
    }
  }, [favoriteRecipesResp, activeTab, currentPage]);

  useEffect(() => {
    if (activeTab === 'My recipes') {
      setOwnRecipes(personalRecipesResp);
    }
  }, [personalRecipesResp, activeTab]);

  useEffect(() => {
    if (!isCurrentUser) {
      setOtherUserRecipes(externalUserRecipes);
    }
  }, [externalUserRecipes, isCurrentUser, currentPage]);

  useEffect(() => {
    if (activeTab === 'Followers') {
      setFollowers(followersResp);
    }
  }, [followersResp, activeTab, currentPage]);

  useEffect(() => {
    if (activeTab === 'Following') {
      setFollowings(followingResp);
    }
  }, [followingResp, activeTab, currentPage]);

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('avatar', file);

      try {
        const result = await updateAvatar({ formData, token }).unwrap();
        dispatch(updateUserAvatar({ data: result }));
      } catch (error) {
        toast('Failed to update avatar:', error);
      }
    }
  };

  const handlePage = useCallback(
    clickedPage => {
      if (clickedPage !== currentPage) {
        setCurrentPage(clickedPage);
        window.scrollTo({
          top: 100,
          left: 0,
          behavior: 'smooth',
        });
      }
    },

    [currentPage]
  );

  const renderContent = () => {
    if (isCurrentUser) {
      if (activeTab === 'My recipes') {
        if (isLoadingPersonalRecipes) return <div>Loading...</div>;
        return ownRecipes?.total > 0 ? (
          <>
            <ListItems
              data={ownRecipes.recipes}
              isLoading={isLoadingPersonalRecipes}
              typeOfCard="RecipeCard"
              typeOfList="MyRecipes"
            />
            <ListPagination
              handlePage={handlePage}
              page={currentPage}
              total={ownRecipes.total}
              limit={LIMIT_RECIPES}
            />
          </>
        ) : (
          <p>
            Nothing has been added to your recipes list yet. Please browse our
            recipes and add your favorites for easy access in the future.
          </p>
        );
      } else if (activeTab === 'My favorites') {
        if (isLoadingFavoriteRecipes) return <div>Loading...</div>;
        return favoriteRecipes?.total > 0 ? (
          <>
            <ListItems
              data={favoriteRecipes.recipes}
              isLoading={isLoadingFavoriteRecipes}
              typeOfCard="RecipeCard"
              typeOfList="MyFavoritesRecipes"
            />
            <ListPagination
              handlePage={handlePage}
              page={currentPage}
              total={favoriteRecipes.total}
              limit={LIMIT_RECIPES}
            />
          </>
        ) : (
          <p>You have no favorite recipes yet. Start exploring and add some!</p>
        );
      } else if (activeTab === 'Following') {
        if (isLoadingFollowing) return <div>Loading...</div>;
        return followings?.total > 0 ? (
          <>
            <ListItems
              data={followings.data}
              isLoading={isLoadingFollowing}
              typeOfCard="UserCard"
              typeOfList="Following"
            />
            <ListPagination
              handlePage={handlePage}
              page={currentPage}
              total={followings?.total}
              limit={LIMIT_FOLLOW}
            />
          </>
        ) : (
          <p>
            You&#39;re not following anyone yet. Start following people to see
            their latest updates!
          </p>
        );
      }
    }

    if (!isCurrentUser) {
      if (activeTab === 'Recipes') {
        if (isLoadingExternalUserRecipes) return <div>Loading...</div>;
        return otherUserRecipes?.total > 0 ? (
          <>
            <ListItems
              data={otherUserRecipes.recipes}
              isLoading={isLoadingExternalUserRecipes}
              typeOfCard="RecipeCard"
              typeOfList="Recipes"
            />
            <ListPagination
              handlePage={handlePage}
              page={currentPage}
              total={otherUserRecipes.total}
              limit={LIMIT_RECIPES}
            />
          </>
        ) : (
          <p>User does not have Recipes</p>
        );
      }
    }

    if (activeTab === 'Followers') {
      if (isLoadingFollowers) return <div>Loading...</div>;
      return followers?.total > 0 ? (
        <>
          <ListItems
            data={followers.data}
            isLoading={isLoadingFollowers}
            typeOfCard="UserCard"
            typeOfList="Followers"
          />
          <ListPagination
            handlePage={handlePage}
            page={currentPage}
            total={followers.total}
            limit={LIMIT_RECIPES}
          />
        </>
      ) : (
        <p>
          There are currently no followers on your account. Please engage our
          visitors with interesting content and draw their attention to your
          profile.
        </p>
      );
    }

    return <></>;
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const toggleModal = type => {
    setModalType(type);
    setIsLogOutModalOpen(!isLogOutModalOpen);
  };

  const handleLogoutClick = () => {
    toggleModal();
  };

  const addUserToFollowingListHandler = async id => {
    addUserToFollowingList(id);
  };

  const removeUserFromFollowingListHandler = async id => {
    removeUserFromFollowingList(id);
  };

  const error = userError || currentUserError || null;

  return (
    <Container data-label="userProfile" addClass={cl.container}>
      {(isLoadingUser || isLoadingCurrentUser) && (
        <div>Loading user data...</div>
      )}

      {error?.status === 401 && <Navigate to="/" />}

      {error && (
        <ErrorFormMessage
          message={`Error: ${error?.data?.message || error || 'unknown error'}`}
        />
      )}

      {(isSuccessCurrentUser || isSuccessUser) && (
        <>
          <PathInfo />
          <MainTitle>Profile</MainTitle>
          <Subtitle addClass={cl.subtitle}>
            Reveal your culinary art, share your favorite recipe and create
            gastronomic masterpieces with us.
          </Subtitle>

          <div className={cl.userData}>
            <div className={cl.userWrap}>
              {userData && (
                <div className={cl.userInfo}>
                  <div className={cl.imgWrap}>
                    <img
                      className={cl.userInfoImage}
                      src={userData?.avatar}
                      alt={`${userData?.name}'s avatar`}
                    />
                    {isCurrentUser && (
                      <Button addClass={cl.plusBtn} onClick={handleClick}>
                        <Icon icon="whitePlus" />
                      </Button>
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      style={{ display: 'none' }}
                      onChange={handleFileChange}
                    />
                  </div>

                  <h1>{userData?.name}</h1>
                  <div className={cl.userTextWrap}>
                    <p className={cl.userInfoText}>
                      Email:{' '}
                      <span className={cl.userInfoSpan}>{userData?.email}</span>
                    </p>
                    <p className={cl.userInfoText}>
                      Added recipes:{' '}
                      <span className={cl.userInfoSpan}>
                        {userData?.recipesQty}
                      </span>{' '}
                    </p>
                    <p className={cl.userInfoText}>
                      Favorites:{' '}
                      <span className={cl.userInfoSpan}>
                        {userData?.favRecipesQty}
                      </span>{' '}
                    </p>
                    <p className={cl.userInfoText}>
                      Followers:{' '}
                      <span className={cl.userInfoSpan}>
                        {userData?.followersQty}
                      </span>{' '}
                    </p>
                    <p className={cl.userInfoText}>
                      Following:{' '}
                      <span className={cl.userInfoSpan}>
                        {userData?.followingQty}
                      </span>{' '}
                    </p>
                  </div>
                </div>
              )}
              {isCurrentUser && (
                <Button addClass={cl.logoutBtn} onClick={handleLogoutClick}>
                  Log out
                </Button>
              )}
              {!isCurrentUser && !userData?.isFollowing && (
                <Button
                  addClass={cl.logoutBtn}
                  onClick={() => addUserToFollowingListHandler(userId)}
                >
                  Follow
                </Button>
              )}

              {!isCurrentUser && userData?.isFollowing && (
                <Button
                  addClass={cl.logoutBtn}
                  onClick={() => removeUserFromFollowingListHandler(userId)}
                >
                  UnFollow
                </Button>
              )}
            </div>

            <div className={cl.tablistBox}>
              <TabsList
                isCurrentUser={isCurrentUser}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setCurrentPage={setCurrentPage}
              />

              <div className={cl.tabContent}>{renderContent()}</div>
            </div>
          </div>
        </>
      )}
      {isLogOutModalOpen && <Modal onClose={toggleModal} type={modalType} />}
    </Container>
  );
};

export default UserPage;

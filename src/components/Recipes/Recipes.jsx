import { useCallback, useEffect, useState } from 'react';
import { recipesApi } from '../../redux/recipes/recipesApi';
import RecipeFilters from './RecipeFilters';
import RecipeList from './RecipeList';
import RecipePagination from './RecipePagination';
import getLimitForViewport from '../../utils/getLimitForViewport';
import cl from './recipes.module.scss';
import SkeletonRecipeCard from './RecipeCard/SkeletonRecipeCard';
import { useSelector } from 'react-redux';
import authApi from '../../redux/auth/AuthApi';
import { useParams } from 'react-router-dom';
import scrollUpToSection from '../../utils/scrollUpToSection';
import Subtitle from '../ui/Subtitle';
import ButtonLink from '../ui/ButtonLink';
import MainTitle from '../ui/MainTitle';

const SKELETON_AMOUNT = 6;
const ALL_CATEGORIES = 'all';
const DEFAULT_CURRENT_CATEGORY = { _id: null, name: ALL_CATEGORIES };
const DEFAULT_USER = { _id: null, name: null, avatar: null };

const Recipes = () => {
  // amount of elements
  const limit = getLimitForViewport();
  const [totalElements, setTotalElements] = useState(0);
  const [page, setPage] = useState(1);
  //categories
  const { name: category } = useParams();
  const [currentCategory, setCategory] = useState(DEFAULT_CURRENT_CATEGORY);
  const categories = useSelector(state => state.categoriesSlice.categories);
  //add filters
  const [ingredients, setIngredient] = useState('');
  const [area, setArea] = useState('');
  //user
  const [user, setUser] = useState(DEFAULT_USER);
  const isLoggedIn = useSelector(state => state.authSlice.isLoggedIn);
  const { data: userResp, isSuccess: isUserSuccess } =
    authApi.useFetchCurrentUserQuery({}, { skip: !isLoggedIn });
  //recipe list
  const [recipeList, setRecipeList] = useState([]);
  const { data, isFetching, isSuccess, isError } =
    recipesApi.useGetRecipesQuery(
      {
        page,
        limit,
        category: currentCategory?._id,
        area: area?._id,
        ingredients: ingredients?._id,
        userId: user?._id,
      },
      { refetchOnMountOrArgChange: true }
    );

  useEffect(() => {
    if (category !== ALL_CATEGORIES && categories.length > 0) {
      const currentCategory = categories.find(item => item._id === category);
      setCategory(currentCategory);
    }
  }, [category, categories]);

  useEffect(() => {
    if (isLoggedIn) {
      if (isUserSuccess && userResp) {
        setUser(userResp);
      }
    } else if (!isLoggedIn) {
      setUser(DEFAULT_USER);
    }
  }, [isLoggedIn, user, isUserSuccess, userResp]);

  useEffect(() => {
    if (isSuccess && data) {
      const { recipes, total } = data;
      setRecipeList(recipes);
      setTotalElements(total);
    }
  }, [isSuccess, data, isLoggedIn]);

  const handlePage = useCallback(
    clickedPage => {
      if (clickedPage !== page) {
        setPage(clickedPage);
      }

      scrollUpToSection('#categories');
    },
    [page]
  );

  const handleIngredient = data => {
    if (!data) {
      setIngredient('');
      return;
    }
    const { value, label } = data;
    if (value === ingredients?._id) {
      setIngredient('');
    } else {
      setIngredient({ _id: value, name: label });
      setPage(1);
    }
  };

  const handleCategories = data => {
    if (!data) {
      setCategory(DEFAULT_CURRENT_CATEGORY);
      return;
    }
    const { value, label } = data;
    if (value === currentCategory._id) {
      setCategory(DEFAULT_CURRENT_CATEGORY);
    } else {
      setCategory({ _id: value, name: label });
      setPage(1);
    }
  };

  const handleArea = data => {
    if (!data) {
      setArea('');
      return;
    }
    const { value, label } = data;
    if (value === area?._id) {
      setArea('');
    } else {
      setArea({ _id: value, name: label });
      setPage(1);
    }
  };
  return (
    <>
      <ButtonLink icon="arrow-back" addClass={cl.recipeBack} to={'/'}>
        <span>Back</span>
      </ButtonLink>
      <MainTitle>
        {isFetching
          ? 'Loading...'
          : currentCategory._id
          ? currentCategory.name
          : ALL_CATEGORIES}
      </MainTitle>
      <Subtitle addClass={cl.recipeSubtitle}>
        Go on a taste journey, where every sip is a sophisticated creative
        chord, and every dessert is an expression of the most refined
        gastronomic desires.
      </Subtitle>
      <div className={cl.recipesWrapper} id="recipes">
        <RecipeFilters
          handleIngredient={handleIngredient}
          handleArea={handleArea}
          handleCategories={handleCategories}
          category={currentCategory._id ? currentCategory.name : ALL_CATEGORIES}
        />
        {isFetching ? (
          <ul className={cl.skeletonList}>
            {[...new Array(SKELETON_AMOUNT)].map((_, i) => (
              <SkeletonRecipeCard key={i} />
            ))}
          </ul>
        ) : isError || recipeList.length === 0 ? (
          <div className={cl.recipesContainer}>
            <p className={cl.error}>{'No recipies found'}</p>
          </div>
        ) : (
          <div className={cl.recipesContainer}>
            <RecipeList recipeList={recipeList} />
            <RecipePagination
              handlePage={handlePage}
              page={page}
              total={totalElements}
              limit={limit}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Recipes;

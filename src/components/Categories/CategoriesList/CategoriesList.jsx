import cl from './categoriesList.module.scss';
import { useGetCategoriesQuery } from '../../../redux/categories/categoriesApi';
import CategoryCard from '../CategoryCard';
import { useMediaPredicate } from 'react-media-hook';
import BREAKPOINTS from '../../../assets/constants/breakpoints';
import CategorySkeleton from '../CategorySkeleton';
import { useEffect, useState } from 'react';

const { MOBILE, MOBILE_MAX, TABLET, DESKTOP } = BREAKPOINTS;

const CategoryList = ({ handleCategories }) => {
  const IS_TABLET = useMediaPredicate(`(min-width: ${TABLET})`);
  const IS_DESKTOP = useMediaPredicate(`(min-width: ${DESKTOP})`);
  const IS_MOBILE = useMediaPredicate(
    `(min-width: ${MOBILE}) and (max-width: ${MOBILE_MAX})`
  );

  const {
    data: allCategories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoriesQuery();

  const [categories, setCategories] = useState([]);
  const [categoriesSet, setCategoriesSet] = useState(false);
  const toRenderNumber = IS_MOBILE ? 8 : 11;

  useEffect(() => {
    if (isSuccess && !categoriesSet) {
      const list = allCategories.slice(0, toRenderNumber);
      list.push({ _id: 'all_categories', name: 'All categories' });
      setCategories(list);
      handleCategories(list);
      setCategoriesSet(true);
    }
  }, [
    isSuccess,
    allCategories,
    toRenderNumber,
    handleCategories,
    categories,
    categoriesSet,
  ]);

  return (
    <>
      {isLoading && (
        <ul className={cl['categories-list']}>
          {[...Array(toRenderNumber + 1)].map((_, idx) => {
            const isWide = isElementWide(idx, IS_TABLET, IS_DESKTOP);
            return <CategorySkeleton key={idx} isWide={isWide} />;
          })}
        </ul>
      )}

      {isSuccess && (
        <ul className={cl['categories-list']}>
          {categories?.map((item, idx) => {
            const isWide = isElementWide(idx, IS_TABLET, IS_DESKTOP);
            return (
              <CategoryCard
                key={item._id}
                categoryId={item._id}
                name={item.name}
                isWide={isWide}
              />
            );
          })}
        </ul>
      )}

      {isError && (
        <p
          style={{ color: 'red', fontWeight: 700 }}
        >{`Error: ${error.message}`}</p>
      )}
    </>
  );
};

const isElementWide = (idx, tablet, desktop) => {
  const position = idx + 1;
  let rem;
  let isWide = false;

  if (tablet) {
    rem = position % 5;
    isWide = rem === 3;
  }

  if (desktop) {
    rem = position % 6;
    isWide = rem === 3 || rem === 4;
  }

  return isWide;
};

export default CategoryList;

import SecondTitle from '../ui/SecondTitle';
import Subtitle from '../ui/Subtitle/Subtitle';
import CategoriesList from './CategoriesList';
import { useDispatch } from 'react-redux';
import { categoriesSlice } from '../../redux/categories/categoriesSlice';

const Categories = () => {
  const dispatch = useDispatch();
  const handleCategories = categories => {
    dispatch(categoriesSlice.actions.setCategories(categories));
  };
  return (
    <>
      <SecondTitle>Categories</SecondTitle>
      <Subtitle>
        Discover a limitless world of culinary possibilities and enjoy exquisite
        recipes that combine taste, style and the warm atmosphere of the
        kitchen.
      </Subtitle>
      <CategoriesList handleCategories={handleCategories} />
    </>
  );
};

export default Categories;

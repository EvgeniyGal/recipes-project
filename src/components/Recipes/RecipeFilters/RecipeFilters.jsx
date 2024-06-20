import cl from './recipeFilters.module.scss';
import Select from 'react-select';
import PropTypes from 'prop-types';
import { useEffect, useState, useRef } from 'react'; // Added useRef
import { ingredientsApi } from '../../../redux/ingredients/ingredientsApi';
import { areasApi } from '../../../redux/areas/areasApi';
import { categoriesApi } from '../../../redux/categories/categoriesApi';
import SkeletonSelect from '../../ui/Select/SkeletonSelect';

const RecipeFilters = ({
  handleIngredient,
  handleArea,
  handleCategories,
  category,
}) => {
  const DEFAULT_CATEGORY = 'category';
  const DEFAULT_AREA = 'area';
  const DEFAULT_INGREDIENTS = 'ingredients';

  const [selectList, setSelectList] = useState([]);
  const [areasList, setAreasList] = useState([]);
  const [ingredientsList, setIngredientsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const selectRef = useRef(null); // Ref for Select component

  const {
    data: ingredientsResp,
    isLoading: isIngredientsFetching,
    isSuccess: isIngredientsSuccess,
  } = ingredientsApi.useGetIngredientsQuery();
  const {
    data: areasResp,
    isLoading: isAreasFetching,
    isSuccess: isAreasSuccess,
  } = areasApi.useGetAreasQuery();
  const {
    data: categoriesResp,
    isLoading: isCategoriesFetching,
    isSuccess: isCategoriesSuccess,
  } = categoriesApi.useGetCategoriesQuery();

  useEffect(() => {
    if (isIngredientsSuccess && ingredientsResp) {
      setIngredientsList(ingredientsResp);
      setSelectList(prevSelectList => [...prevSelectList, DEFAULT_INGREDIENTS]);
    }
  }, [isIngredientsSuccess, ingredientsResp]);

  useEffect(() => {
    if (isAreasSuccess && areasResp) {
      setAreasList(areasResp);
      setSelectList(prevSelectList => [...prevSelectList, DEFAULT_AREA]);
    }
  }, [isAreasSuccess, areasResp]);

  useEffect(() => {
    if (isCategoriesSuccess && categoriesResp.length > 0) {
      setCategoriesList(categoriesResp);
      setSelectedCategory(category === 'all' ? DEFAULT_CATEGORY : category);
      setSelectList(prevSelectList => [
        ...prevSelectList.filter(el => el !== selectedCategory),
        selectedCategory,
      ]);
    }
  }, [isCategoriesSuccess, category, categoriesResp, selectedCategory]);

  const handleIngredientChange = selectedOption => {
    setSelectedIngredient(selectedOption);
    handleIngredient(selectedOption);
  };

  const handleAreaChange = selectedOption => {
    setSelectedArea(selectedOption);
    handleArea(selectedOption);
  };

  const handleCategoryChange = selectedOption => {
    setSelectedCategory(selectedOption);
    handleCategories(selectedOption);
  };

  const clearSelect = item => {
    switch (item) {
      case DEFAULT_INGREDIENTS:
        handleIngredientChange(null);
        break;
      case DEFAULT_AREA:
        handleAreaChange(null);
        break;
      case DEFAULT_CATEGORY:
        handleCategoryChange(null);
        break;
      default:
        return null;
    }

    selectRef.current.select.clearValue();
    selectRef.current.select.blur();
  };

  const renderSelect = item => {
    let options, onChange, value, isLoading, isSuccess;

    switch (item) {
      case DEFAULT_INGREDIENTS:
        options = ingredientsList.map(ingredient => ({
          value: ingredient._id,
          label: ingredient.name,
        }));
        onChange = handleIngredientChange;
        isLoading = isIngredientsFetching;
        value = selectedIngredient;
        isSuccess = isIngredientsSuccess;
        break;
      case DEFAULT_AREA:
        options = areasList.map(area => ({
          value: area._id,
          label: area.name,
        }));
        onChange = handleAreaChange;
        isLoading = isAreasFetching;
        value = selectedArea;
        isSuccess = isAreasSuccess;
        break;
      case DEFAULT_CATEGORY:
        options = categoriesList.map(category => ({
          value: category._id,
          label: category.name,
        }));
        onChange = handleCategoryChange;
        isLoading = isCategoriesFetching;
        value = selectedCategory;
        isSuccess = isCategoriesSuccess;
        break;
      default:
        return null;
    }

    return (
      <li key={item}>
        {isLoading ? (
          <SkeletonSelect />
        ) : isSuccess ? (
          <Select
            ref={selectRef} // Assign the ref here
            options={options}
            onChange={onChange}
            value={value}
            placeholder={`Select ${item}`}
            isClearable
            isSearchable
            className="react-select-container"
            classNamePrefix="react-select"
            components={{
              ClearIndicator: () => (
                <div className={cl.clear} onClick={() => clearSelect(item)}>
                  Clear
                </div>
              ),
            }}
          />
        ) : null}
      </li>
    );
  };

  return (
    <ul className={cl.recipeFilters}>
      {selectList.map(item => renderSelect(item))}
    </ul>
  );
};

RecipeFilters.propTypes = {
  handleIngredient: PropTypes.func.isRequired,
  handleArea: PropTypes.func.isRequired,
  handleCategories: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};

export default RecipeFilters;

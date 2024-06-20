import { useState } from 'react';
import { useAddRecipeMutation } from '../../../redux/recipes/recipesApi';
import { useGetCategoriesQuery } from '../../../redux/categories/categoriesApi';
import { useGetIngredientsQuery } from '../../../redux/ingredients/ingredientsApi';
import { useGetAreasQuery } from '../../../redux/areas/areasApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const useRecipeLogic = (setValue, getValues, setError, reset) => {
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { data: categories } = useGetCategoriesQuery();
  const { data: ingredients } = useGetIngredientsQuery();
  const { data: area } = useGetAreasQuery();
  const [addRecipe] = useAddRecipeMutation();

  const categoryOptions =
    categories?.map(({ _id, name }) => ({
      value: _id,
      label: name,
    })) || [];

  const ingredientOptions =
    ingredients?.map(({ _id, name }) => ({
      value: _id,
      label: name,
    })) || [];

  const areaOptions =
    area?.map(({ _id, name }) => ({
      value: _id,
      label: name,
    })) || [];

  const handleClear = reset => {
    reset();
    setImagePreview(null);
    setSelectedIngredients([]);
  };

  const handleImageChange = event => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      setImageFile(file);
      setValue('thumb', file);
      reader.onload = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setError('thumb', null);
    }
  };

  const removeIngredient = id => {
    setSelectedIngredients(prev => prev.filter(el => el._id !== id));
  };

  const addIngredient = () => {
    const { ingredient, measure } = getValues('ingredients')[0];

    if (!ingredient || !measure) {
      setError('ingredients', {
        type: 'required',
        message: 'Both ingredient and measure must be filled',
      });
      return;
    }

    setError('ingredients', null);

    const isAlreadySelected = selectedIngredients.find(
      i => i._id === ingredient.value
    );
    if (isAlreadySelected) {
      setError('ingredients', {
        type: 'required',
        message: 'This ingredient is already in the list',
      });
      return;
    }

    const option = ingredients.find(i => i._id === ingredient.value);
    if (option) {
      setSelectedIngredients(prevIngredients => [
        ...prevIngredients,
        {
          ...option,
          measure: measure,
        },
      ]);
    }
    setValue('ingredients', [{ ingredient: null, measure: '' }]);
  };

  const onSubmit = async data => {
    if (selectedIngredients.length === 0) {
      setError('ingredients', {
        type: 'manual',
        message: 'At least one ingredient should be added',
      });
      return;
    }

    setLoading(true);

    const formattedData = {
      title: data.title,
      description: data.description,
      category: data.category.value,
      area: data.area.value,
      ingredients: selectedIngredients.map(ing => ({
        id: ing._id,
        measure: ing.measure,
      })),
      instructions: data.instructions,
      time: data.time.toString(),
      thumb: imageFile,
    };

    try {
      const { data } = await addRecipe(formattedData);
      toast.success(`Recipe was succesfully added`);
      navigate(`/recipe/${data._id}`)
    } catch (error) {
      toast.error(`Error adding recipe: ${error.message}`);
      console.error('Error adding recipe:', error.message);
    } finally {
      setLoading(false);
      handleClear(reset);
    }
  };

  return {
    categoryOptions,
    ingredientOptions,
    areaOptions,
    imagePreview,
    selectedIngredients,
    handleClear,
    handleImageChange,
    removeIngredient,
    addIngredient,
    onSubmit,
    loading,
  };
};

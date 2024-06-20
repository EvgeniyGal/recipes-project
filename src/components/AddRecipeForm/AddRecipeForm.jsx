import { useFormFields } from './hooks/useFormFields';
import { useRecipeLogic } from './hooks/useRecipeLogic';
import FormGroup from './components/FormGroup';
import FileInput from './components/FileInput';
import IngredientField from './components/IngredientField';
import CookingTimeControl from './components/CookingTimeControl';
import sprite from '../../assets/icons/sprite.svg';
import cl from './addRecipeForm.module.scss';
import SubmitButton from '../ui/SubmitButton';
import Select from 'react-select';
import IngredientCard from '../IngredientCard';
import { Controller } from 'react-hook-form';

const AddRecipeForm = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    getValues,
    setError,
    reset,
    errors,
    fields,
  } = useFormFields();

  const {
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
  } = useRecipeLogic(setValue, getValues, setError, reset);

  const currentCookingTime = watch('time', 10);
  const descriptionLength = watch('description', '').length;
  const instructionsLength = watch('instructions', '').length;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cl.form}>
      <div className={cl['fileInput-container']}>
        <FormGroup label="Recipe Image" error={errors.thumb?.message}>
          <FileInput
            id="thumb"
            register={register('thumb')}
            onChange={handleImageChange}
            imagePreview={imagePreview}
          />
        </FormGroup>
      </div>

      <div className={cl['recipeInfo-container']}>
        <div className={cl['name-wrapper']}>
          <FormGroup label="" error={errors.title?.message}>
            <input
              type="text"
              {...register('title')}
              className={cl['recipe-name-input']}
              placeholder="The name of the recipe"
            />
          </FormGroup>
          <FormGroup label="" error={errors.description?.message}>
            <div className={cl['custome-form-group']}>
              <textarea
                {...register('description')}
                className={cl.textarea}
                placeholder="Enter the description of the dish"
              />
              <span className={cl['chars-count-description']}>
                {descriptionLength}/200
              </span>
            </div>
          </FormGroup>
        </div>

        <div className={cl['form-group-wrapper']}>
          <FormGroup
            addClass={cl['category-wrapper']}
            label="Category"
            error={errors.category?.message}
          >
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={categoryOptions}
                  placeholder="Select a category"
                  className="react-select-container"
                  classNamePrefix="react-select"
                  value={field.value || null}
                />
              )}
            />
          </FormGroup>

          <FormGroup label="Cooking Time" error={errors.time?.message}>
            <CookingTimeControl
              value={currentCookingTime}
              onDecrement={() =>
                setValue('time', Math.max(0, currentCookingTime - 1))
              }
              onIncrement={() => setValue('time', currentCookingTime + 1)}
            />
          </FormGroup>
        </div>

        <FormGroup label="Area" error={errors.area?.message}>
          <Controller
            name="area"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={areaOptions}
                placeholder="Select an area"
                className="react-select-container"
                classNamePrefix="react-select"
                value={field.value || null}
              />
            )}
          />
        </FormGroup>

        <FormGroup label="Ingredients" error={errors.ingredients?.message}>
          {fields.map((field, index) => (
            <IngredientField
              key={field.id}
              index={index}
              control={control}
              register={register}
              options={ingredientOptions}
              errors={errors.ingredients?.[index]}
            />
          ))}
          <button
            className={cl['add-ingredient-button']}
            type="button"
            onClick={addIngredient}
          >
            Add Ingredient
            <svg width={16} height={16}>
              <use href={`${sprite}#plus`}></use>
            </svg>
          </button>
        </FormGroup>

        {selectedIngredients.length > 0 && (
          <div>
            <ul className={cl['ingredients-list']}>
              {selectedIngredients.map(({ _id, img, name, measure }) => (
                <IngredientCard
                  key={_id}
                  id={_id}
                  img={img}
                  name={name}
                  measure={measure}
                  removeIngredient={removeIngredient}
                />
              ))}
            </ul>
          </div>
        )}

        <FormGroup
          label="Recipe Preparation"
          error={errors.instructions?.message}
        >
          <div className={cl['custome-form-group']}>
            <textarea
              className={cl.textarea}
              {...register('instructions')}
              placeholder="Enter recipe"
            />
            <span className={cl['chars-count-instructions']}>
              {instructionsLength}/200
            </span>
          </div>
        </FormGroup>

        <div className={cl['form-actions']}>
          <button
            type="button"
            onClick={() => handleClear(reset)}
            className={cl['clear-button']}
          >
            <svg width={20} height={20}>
              <use href={`${sprite}#trash`}></use>
            </svg>
          </button>
          <SubmitButton
            addClass={cl['submit-btn']}
            type="submit"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Publish'}
          </SubmitButton>
        </div>
      </div>
    </form>
  );
};

export default AddRecipeForm;

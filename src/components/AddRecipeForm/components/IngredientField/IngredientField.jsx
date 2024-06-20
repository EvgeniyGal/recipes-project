/* eslint-disable react/prop-types */

import { Controller } from 'react-hook-form';
import Select from 'react-select';
import cl from './ingredientField.module.scss';
import ErrorFormMessage from '../../../ui/ErrorFormMessage';

const IngredientField = ({ control, register, index, options, errors }) => {
  return (
    <div className={cl['ingredient-fields-wrapper']}>
      <div className={cl['ingredient-field']}>
        <div className={cl['form-group']}>
          <Controller
            name={`ingredients[${index}].ingredient`}
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={options}
                placeholder="Add the ingredient"
                className="react-select-container"
                classNamePrefix="react-select"
                value={field.value || null}
              />
            )}
          />
          {errors?.ingredient && (
            <ErrorFormMessage
              addClass={cl['custome-error']}
              message={errors.ingredient?.message}
            />
          )}
        </div>
        <div className={cl['form-group']}>
          <input
            type="text"
            {...register(`ingredients[${index}].measure`)}
            placeholder="Enter quantity"
            className={cl.input}
          />
          {errors?.measure && (
            <ErrorFormMessage
              addClass={cl['custome-error']}
              message={errors.measure.message}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default IngredientField;

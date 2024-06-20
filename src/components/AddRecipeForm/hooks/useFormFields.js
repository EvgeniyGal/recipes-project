
import { useForm, useFieldArray } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../utils/form-validation-schema';

export const useFormFields = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      time: 10,
      title: '',
      description: '',
      category: null,
      area: null,
      ingredients: [{ ingredient: null, measure: '' }],
      instructions: '',
      thumb: null,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: 'ingredients',
  });

  return {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    getValues,
    setError,
    errors,
    fields,
  };
};

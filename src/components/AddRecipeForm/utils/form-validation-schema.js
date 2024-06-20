import * as yup from 'yup';

export const schema = yup.object().shape({
  thumb: yup.mixed().required('Please select a recipe image'),
  title: yup.string().required('Recipe name is required'),
  category: yup.object().required('Category is required'),
  area: yup.object().required('Area is required'),
  time: yup
    .number()
    .min(1, 'Cooking time must be at least 1 minute')
    .required(),
  instructions: yup
    .string()
    .max(200, 'Maximum 200 characters allowed')
    .required('Recipe instruction is required'),
  description: yup
    .string()
    .max(200, 'Maximum 200 characters allowed')
    .required('Recipe description is required'),
});


// import * as yup from 'yup';

// export const schema = yup.object().shape({
//   name: yup.string().required('Введіть назву рецепта'),
//   description: yup
//     .string()
//     .max(200, 'Опис не повинен перевищувати 200 символів')
//     .required('Введіть опис рецепта'),
//   category: yup.string().required('Оберіть категорію'),
//   area: yup.string().required('Оберіть походження'),
//   time: yup
//     .number()
//     .min(1, 'Час приготування повинен бути не менше 1 хвилини')
//     .required('Вкажіть час приготування'),
//   instructions: yup
//     .string()
//     .max(200, 'Інструкції не повинні перевищувати 200 символів')
//     .required('Введіть інструкції'),
//   thumb: yup.mixed().required('Додайте зображення'),
//   ingredient: yup.string(),
//   measure: yup
//     .string()
//     .min(1, 'Введіть кількість')
//     .when('ingredient', {
//       is: ingredient => ingredient?.length > 0,
//       then: yup.string().required('Введіть кількість'),
//     }),
// });


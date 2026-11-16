import { COURSES, type Course, type MenuItemInput } from '../types';

export interface FormValues {
  name: string;
  description: string;
  course: Course | '';
  price: string;
  ingredients: string;
  prepTime: string;
  isAvailable: boolean;
}

export type FormErrors = Partial<Record<'name' | 'description' | 'course' | 'price' | 'prepTime', string>>;

export const emptyForm: FormValues = {
  name: '',
  description: '',
  course: '',
  price: '',
  ingredients: '',
  prepTime: '',
  isAvailable: true,
};

export function validateForm(values: FormValues, otherNames: string[]): FormErrors {
  const errors: FormErrors = {};
  const name = values.name.trim();
  if (!name) errors.name = 'Dish name is required.';
  else if (name.length < 2) errors.name = 'Dish name must be at least 2 characters.';
  else if (otherNames.some((n) => n.trim().toLowerCase() === name.toLowerCase()))
    errors.name = 'A dish with this name already exists.';

  const description = values.description.trim();
  if (!description) errors.description = 'Please add a short description.';
  else if (description.length > 200) errors.description = 'Description must be 200 characters or fewer.';

  if (!values.course || !COURSES.includes(values.course)) errors.course = 'Please choose a course.';

  const price = Number(values.price);
  if (values.price.trim() === '') errors.price = 'Price is required.';
  else if (!Number.isFinite(price) || price <= 0) errors.price = 'Price must be a number greater than 0.';
  else if (price > 100000) errors.price = 'Price looks too high. Please check it.';

  if (values.prepTime.trim() !== '') {
    const prep = Number(values.prepTime);
    if (!Number.isInteger(prep) || prep < 0 || prep > 600)
      errors.prepTime = 'Prep time must be a whole number of minutes (0–600).';
  }
  return errors;
}

export const toInput = (values: FormValues, image?: string): MenuItemInput => ({
  name: values.name.trim(),
  description: values.description.trim(),
  course: values.course as Course,
  price: Math.round(Number(values.price) * 100) / 100,
  ingredients: values.ingredients.split(',').map((s) => s.trim()).filter(Boolean),
  prepTime: values.prepTime.trim() === '' ? 0 : Number(values.prepTime),
  isAvailable: values.isAvailable,
  image,
});

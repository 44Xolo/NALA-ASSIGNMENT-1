import { useState, type FormEvent } from 'react';
import { COURSES, type Course, type MenuItem, type MenuItemInput } from '../types';
import { emptyForm, toInput, validateForm, type FormErrors, type FormValues } from '../utils/validation';
import FormField, { inputClass } from './FormField';

interface Props {
  /** When provided the form edits this item, otherwise it creates a new one. */
  item?: MenuItem;
  otherNames: string[];
  submitLabel: string;
  onSubmit: (input: MenuItemInput) => void;
  onCancel: () => void;
  onInvalid: () => void;
}

const fromItem = (item: MenuItem): FormValues => ({
  name: item.name,
  description: item.description,
  course: item.course,
  price: String(item.price),
  ingredients: item.ingredients.join(', '),
  prepTime: item.prepTime ? String(item.prepTime) : '',
  isAvailable: item.isAvailable,
});

export default function ItemForm({ item, otherNames, submitLabel, onSubmit, onCancel, onInvalid }: Props) {
  const [values, setValues] = useState<FormValues>(item ? fromItem(item) : emptyForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    const next = { ...values, [key]: value };
    setValues(next);
    if (submitted) setErrors(validateForm(next, otherNames));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validateForm(values, otherNames);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      onInvalid();
      return;
    }
    onSubmit(toInput(values, item?.image));
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4 px-4 pb-8">
      <FormField id="name" label="Dish name" error={errors.name}>
        <input
          id="name"
          value={values.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="Enter dish name"
          aria-invalid={!!errors.name}
          className={inputClass(!!errors.name)}
        />
      </FormField>

      <FormField id="course" label="Course" error={errors.course}>
        <select
          id="course"
          value={values.course}
          onChange={(e) => update('course', e.target.value as Course | '')}
          aria-invalid={!!errors.course}
          className={inputClass(!!errors.course)}
        >
          <option value="">Select a course</option>
          {COURSES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </FormField>

      <FormField id="price" label="Price (R)" error={errors.price}>
        <input
          id="price"
          inputMode="decimal"
          value={values.price}
          onChange={(e) => update('price', e.target.value)}
          placeholder="e.g. 145"
          aria-invalid={!!errors.price}
          className={inputClass(!!errors.price)}
        />
      </FormField>

      <FormField
        id="description"
        label="Description"
        error={errors.description}
        hint={`${values.description.length}/200`}
      >
        <textarea
          id="description"
          rows={3}
          value={values.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="Describe the dish"
          aria-invalid={!!errors.description}
          className={inputClass(!!errors.description)}
        />
      </FormField>

      <FormField id="ingredients" label="Ingredients (optional)" hint="Separate with commas">
        <input
          id="ingredients"
          value={values.ingredients}
          onChange={(e) => update('ingredients', e.target.value)}
          placeholder="Eggs, Cream, Gruyère"
          className={inputClass(false)}
        />
      </FormField>

      <FormField id="prepTime" label="Prep time in minutes (optional)" error={errors.prepTime}>
        <input
          id="prepTime"
          inputMode="numeric"
          value={values.prepTime}
          onChange={(e) => update('prepTime', e.target.value)}
          placeholder="e.g. 25"
          aria-invalid={!!errors.prepTime}
          className={inputClass(!!errors.prepTime)}
        />
      </FormField>

      <label className="flex min-h-[44px] items-center gap-3 text-white">
        <input
          type="checkbox"
          checked={values.isAvailable}
          onChange={(e) => update('isAvailable', e.target.checked)}
          className="h-5 w-5 accent-[#C9A86A]"
        />
        Available today
      </label>

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={onCancel} className="h-12 flex-1 rounded-xl border border-white/20 text-white">
          Cancel
        </button>
        <button type="submit" className="h-12 flex-1 rounded-xl bg-nala-gold font-semibold text-black">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}

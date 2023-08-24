import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  className,
  labelClassName,
  errorClassName,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label>
      <span className={getValidClassNames(styles.text, labelClassName)}>
        {label}
      </span>
      <input
        className={getValidClassNames(styles.input, className)}
        {...field}
        type={type}
        placeholder={placeholder}
      />
      {hasError && (
        <span className={getValidClassNames(styles.text, errorClassName)}>
          {error as string}
        </span>
      )}
    </label>
  );
};

export { Input };

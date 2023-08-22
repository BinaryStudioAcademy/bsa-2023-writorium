import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import styles from '~/libs/components/input/styles.module.scss';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  className?: string | undefined;
  labelClassName?: string | undefined;
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
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label>
      <span className={getValidClassNames(styles.label, labelClassName)}>{label}</span>
      <input className={getValidClassNames(styles.input, className)} {...field} type={type} placeholder={placeholder} />
      {hasError && <span>{error as string}</span>}
    </label>
  );
};

export { Input };

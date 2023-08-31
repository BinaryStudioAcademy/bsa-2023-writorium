import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { ErrorMessage } from '~/libs/components/components.js';
import { InputType } from '~/libs/enums/input-type.enum';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: ValueOf<typeof InputType>;
  className?: string;
  labelClassName?: string;
  required?: boolean;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = InputType.TEXT,
  className,
  labelClassName,
  required,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label className={styles.label}>
      <span
        className={getValidClassNames(styles.text, labelClassName, {
          [styles.required]: required,
        })}
      >
        {label}
      </span>
      <input
        className={getValidClassNames(
          styles.input,
          hasError && styles.error,
          className,
        )}
        {...field}
        type={type}
        placeholder={placeholder}
      />
      <ErrorMessage error={error as string} />
    </label>
  );
};

export { Input, type Properties as InputProperties };

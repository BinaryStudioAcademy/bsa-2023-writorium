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
  rows?: number;
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
  rows,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const classNames = getValidClassNames(
    styles.input,
    hasError && styles.error,
    className,
    rows && styles.textarea,
  );

  return (
    <label className={styles.label}>
      <span
        className={getValidClassNames(
          styles.text,
          labelClassName,
          required && styles.required,
        )}
      >
        {label}
      </span>
      {rows ? (
        <textarea
          {...field}
          className={classNames}
          placeholder={placeholder}
          rows={rows}
        />
      ) : (
        <input
          {...field}
          className={classNames}
          placeholder={placeholder}
          type={type}
        />
      )}
      <ErrorMessage error={error as string} />
    </label>
  );
};

export { Input, type Properties as InputProperties };

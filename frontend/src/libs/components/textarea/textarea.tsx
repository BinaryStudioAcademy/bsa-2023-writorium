import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  placeholder: string;
  className?: string;
};

const Textarea = <T extends FieldValues>({
  control,
  errors,
  placeholder,
  className,
  name,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label>
      <textarea
        {...field}
        placeholder={placeholder}
        className={getValidClassNames(className)}
      />
      {hasError && <span>{error as string}</span>}
    </label>
  );
};

export { Textarea };

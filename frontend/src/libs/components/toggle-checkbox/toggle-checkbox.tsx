import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  useController,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { TOGGLE_CHECKBOX_ID } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  className?: string;
  labelClassName?: string;
};

const ToggleCheckbox = <T extends FieldValues>({
  name,
  label,
  control,
}: Properties<T>): JSX.Element => {
  const { field } = useController({ name, control });

  return (
    <div className={styles.container}>
      <input
        {...field}
        name={name}
        type="checkbox"
        id={TOGGLE_CHECKBOX_ID}
        checked={field.value}
        className={getValidClassNames(styles.switch, styles.pointer)}
      />
      <label className={styles.pointer} htmlFor={TOGGLE_CHECKBOX_ID}>
        {label}
      </label>
    </div>
  );
};

export { ToggleCheckbox };

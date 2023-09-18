import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
  useController,
} from 'react-hook-form';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  className?: string;
  labelClassName?: string;
};

const Checkbox = <T extends FieldValues>({
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
        id="toggle-checkbox"
        checked={field.value}
        className={`${styles.switch} ${styles.pointer}`}
      />
      <label className={styles.pointer} htmlFor="toggle-checkbox">
        {label}
      </label>
    </div>
  );
};

export { Checkbox };

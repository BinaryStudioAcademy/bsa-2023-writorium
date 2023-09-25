import { type FieldValues } from 'react-hook-form';

import { IconButton, Input } from '~/libs/components/components.js';
import { type InputProperties } from '~/libs/components/input/input.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

interface IProperties<T extends FieldValues> extends InputProperties<T> {}

const PasswordInput = <T extends FieldValues>(
  properties: IProperties<T>,
): JSX.Element => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const handleTogglePasswordVisibility = useCallback((): void => {
    setPasswordVisibility((previousValue) => !previousValue);
  }, [setPasswordVisibility]);

  return (
    <div className={styles.passwordInputWrapper}>
      <IconButton
        className={styles.passwordToggle}
        onClick={handleTogglePasswordVisibility}
        iconName={isPasswordVisible ? 'hide' : 'view'}
        iconClassName={styles.icon}
      />
      <Input
        {...properties}
        type={isPasswordVisible ? 'text' : 'password'}
        className={styles.passwordInput}
      />
    </div>
  );
};

export { PasswordInput };

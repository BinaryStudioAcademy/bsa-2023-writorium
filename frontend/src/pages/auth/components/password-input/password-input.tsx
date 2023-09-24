import { type FieldValues } from 'react-hook-form';

import { Icon, Input } from '~/libs/components/components.js';
import { type InputProperties } from '~/libs/components/input/input.js';
import { ButtonType, InputType } from '~/libs/enums/enums.js';
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
      <button
        type={ButtonType.BUTTON}
        className={styles.passwordToggle}
        onClick={handleTogglePasswordVisibility}
      >
        <Icon
          iconName={isPasswordVisible ? 'view' : 'hide'}
          className={styles.icon}
        />
      </button>
      <Input
        {...properties}
        type={isPasswordVisible ? InputType.TEXT : InputType.PASSWORD}
      />
    </div>
  );
};

export { PasswordInput };

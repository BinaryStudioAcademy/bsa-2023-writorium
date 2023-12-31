import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ReactMouseEvent, type ValueOf } from '~/libs/types/types.js';

import { Loader } from '../components.js';
import styles from './styles.module.scss';

type ButtonVariant = 'primary' | 'outlined' | 'text';

type ButtonSize = 'medium' | 'small';

type outlinedButtonColor = 'green' | 'white';

type Properties = {
  variant?: ButtonVariant;
  outlinedButtonColor?: outlinedButtonColor;
  size?: ButtonSize;
  isDisabled?: boolean;
  label: React.ReactNode;
  type?: ValueOf<typeof ButtonType>;
  name?: string;
  className?: string;
  hasFullWidth?: boolean;
  isLoading?: boolean;
  onClick?:
    | (() => void)
    | (() => Promise<void>)
    | ((event: ReactMouseEvent<HTMLButtonElement>) => void);
};

const Button: React.FC<Properties> = ({
  type = ButtonType.BUTTON,
  label,
  name = '',
  className = '',
  isDisabled,
  onClick,
  hasFullWidth,
  variant = 'primary',
  outlinedButtonColor = 'green',
  size = 'medium',
  isLoading,
}) => {
  const variantClassNameMapper: Record<ButtonVariant, string> = {
    text: styles.buttonText,
    primary: styles.buttonPrimary,
    outlined: styles.buttonOutlined,
  };

  const sizeClassNameMapper: Record<ButtonSize, string> = {
    medium: styles.buttonMedium,
    small: styles.buttonSmall,
  };

  const handleButtonClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
  ): void => {
    const allowClick = !isDisabled && !isLoading;

    if (onClick && !allowClick) {
      event.preventDefault();
      return;
    }

    void onClick?.(event);
  };

  return (
    <button
      type={type}
      name={name}
      disabled={isDisabled}
      className={getValidClassNames(
        styles.button,
        sizeClassNameMapper[size],
        variantClassNameMapper[variant],
        styles[outlinedButtonColor],
        hasFullWidth && styles.hasFullWidth,
        isLoading && styles.buttonLoading,
        className,
      )}
      onClick={handleButtonClick}
    >
      {isLoading && (
        <Loader
          isLoading
          type="circular"
          hasOverlay={false}
          className={styles.loader}
          overlayClassName={styles.loaderOverlay}
        />
      )}
      {isLoading ? null : label}
    </button>
  );
};

export { Button, type Properties as ButtonProperties };

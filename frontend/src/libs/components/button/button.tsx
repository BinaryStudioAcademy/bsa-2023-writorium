import { type MouseEvent, type ReactNode } from 'react';

import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import { Loader } from '../components.js';
import styles from './styles.module.scss';

type ButtonVariant = 'primary' | 'outlined' | 'text';

type ButtonSize = 'medium' | 'small';

type Properties = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  label: React.ReactNode;
  type?: ValueOf<typeof ButtonType>;
  name?: string;
  className?: string;
  hasFullWidth?: boolean;
  loading?: boolean;
  loadingLabel?: boolean | string;
  onClick?:
    | (() => void)
    | (() => Promise<void>)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
};

const Button: React.FC<Properties> = ({
  type = ButtonType.BUTTON,
  label,
  name = '',
  className = '',
  disabled,
  onClick,
  hasFullWidth,
  variant = 'primary',
  size = 'medium',
  loading,
  loadingLabel,
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

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>): void => {
    const allowClick = !disabled && !loading;

    if (onClick && !allowClick) {
      event.preventDefault();
      return;
    }

    void onClick?.(event);
  };

  const getButtonLoadingLabel = (): ReactNode | null => {
    if (typeof loadingLabel === 'string') {
      return loadingLabel;
    }

    return loadingLabel ? label : null;
  };

  return (
    <button
      type={type}
      name={name}
      disabled={disabled}
      className={getValidClassNames(
        styles.button,
        sizeClassNameMapper[size],
        variantClassNameMapper[variant],
        hasFullWidth && styles.hasFullWidth,
        loading && styles.buttonLoading,
        className,
      )}
      onClick={handleButtonClick}
    >
      {loading && (
        <Loader
          isLoading
          type="circular"
          hasOverlay={false}
          className={styles.loader}
          overlayClassName={styles.loaderOverlay}
        />
      )}
      {loading ? getButtonLoadingLabel() : label}
    </button>
  );
};

export { Button, type Properties as ButtonProperties };

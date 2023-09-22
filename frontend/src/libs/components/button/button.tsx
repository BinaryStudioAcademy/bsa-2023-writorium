import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

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
  fullWidth?: boolean;
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
  fullWidth,
  variant = 'primary',
  size = 'medium',
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

  return (
    <button
      type={type}
      name={name}
      disabled={disabled}
      className={getValidClassNames(
        styles.button,
        sizeClassNameMapper[size],
        variantClassNameMapper[variant],
        fullWidth && styles.fullWidth,
        className,
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { Button, type Properties as ButtonProperties };

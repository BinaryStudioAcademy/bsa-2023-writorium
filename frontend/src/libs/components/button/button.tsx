import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type ButtonVariant = 'primary' | 'outlined' | 'text';

type Properties = {
  variant?: ButtonVariant;
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
}) => {
  const variantClassNameMapper: Record<ButtonVariant, string> = {
    text: 'buttonText',
    primary: styles.buttonPrimary,
    outlined: styles.buttonOutlined,
  };

  return (
    <button
      type={type}
      name={name}
      disabled={disabled}
      className={getValidClassNames(
        styles.button,
        className,
        variantClassNameMapper[variant],
        fullWidth && styles.fullWidth,
      )}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export { Button, type Properties as ButtonProperties };

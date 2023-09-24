import { EMPTY_STRING } from '~/libs/constants/constants.js';
import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ReactMouseEvent, type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  disabled?: boolean;
  label: React.ReactNode;
  type?: ValueOf<typeof ButtonType>;
  name?: string;
  className?: string;
  onClick?:
    | (() => void)
    | (() => Promise<void>)
    | ((event: ReactMouseEvent<HTMLButtonElement>) => void);
};

const Button: React.FC<Properties> = ({
  type = ButtonType.BUTTON,
  label,
  name = EMPTY_STRING,
  className = EMPTY_STRING,
  disabled,
  onClick,
}) => (
  <button
    type={type}
    name={name}
    disabled={disabled}
    className={getValidClassNames(styles.button, className)}
    onClick={onClick}
  >
    {label}
  </button>
);

export { Button, type Properties as ButtonProperties };

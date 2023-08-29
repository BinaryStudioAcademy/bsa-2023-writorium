import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  disabled?: boolean;
  label: string;
  type?: ValueOf<typeof ButtonType>;
  className?: string;
};

const Button: React.FC<Properties> = ({
  type = ButtonType.BUTTON,
  label,
  className = '',
  disabled,
}) => (
  <button
    type={type}
    disabled={disabled}
    className={getValidClassNames(styles.button, className)}
  >
    {label}
  </button>
);

export { Button };
export { type Properties as ButtonProperties };

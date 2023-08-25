import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  label: string | React.ReactNode;
  type?: ValueOf<typeof ButtonType>;
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = ButtonType.BUTTON,
  label,
  className = '',
  onClick,
}) => (
  <button
    type={type}
    className={getValidClassNames(styles.button, className)}
    onClick={onClick}
  >
    {label}
  </button>
);

export { Button };

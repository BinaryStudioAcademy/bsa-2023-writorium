import { ButtonType } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: ValueOf<typeof ButtonType>;
  name?: string;
  className?: string;
};

const Button: React.FC<Properties> = ({
  type = ButtonType.BUTTON,
  label,
  name = '',
  className = '',
}) => (
  <button
    type={type}
    name={name}
    className={getValidClassNames(styles.button, className)}
  >
    {label}
  </button>
);

export { Button };

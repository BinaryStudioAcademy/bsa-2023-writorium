import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  label: string | React.ReactNode;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
};

const Button: React.FC<Properties> = ({
  type = 'button',
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

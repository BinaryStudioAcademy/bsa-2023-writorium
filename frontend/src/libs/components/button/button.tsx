import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  label: string | React.ReactNode;
  type?: 'button' | 'submit';
  className?: string;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  className = '',
}) => (
  <button type={type} className={getValidClassNames(styles.button, className)}>
    {label}
  </button>
);

export { Button };

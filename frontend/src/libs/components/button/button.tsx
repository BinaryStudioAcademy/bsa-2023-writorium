import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  className?: string;
};

const Button: React.FC<Properties> = ({ type = 'button', label, className }) => (
  <button className={getValidClassNames(styles.btn, className)} type={type}>{label}</button>
);

export { Button };

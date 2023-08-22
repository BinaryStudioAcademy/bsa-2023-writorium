import styles from '~/libs/components/button/styles.module.scss';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  className?: string | undefined;
};

const Button: React.FC<Properties> = ({ type = 'button', label, className }) => (
  <button className={getValidClassNames(styles.btn, className)} type={type}>{label}</button>
);

export { Button };

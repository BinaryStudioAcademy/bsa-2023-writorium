import styles from './styles.module.scss';

type Properties = {
  label: string;
  type?: 'button' | 'submit';
  className?: string;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  className = '',
}) => (
  <button type={type} className={`${styles.button} ${styles[className]}`}>
    {label}
  </button>
);

export { Button };

import { type ReactNode } from 'react';

import styles from './styles.module.scss';

type Properties = {
  formElement: ReactNode;
};

const AuthLayout: React.FC<Properties> = ({ formElement }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authFormWrapper}>{formElement}</div>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>WRITORIUM</h1>
      </div>
    </div>
  );
};

export { AuthLayout };

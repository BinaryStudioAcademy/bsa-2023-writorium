import { type ReactNode } from 'react';

import {
  AUTH_FORM_WRAPPER_FLOATING_LETTERS,
  HERO_FLOATING_LETTERS,
} from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  formElement: ReactNode;
};

const AuthLayout: React.FC<Properties> = ({ formElement }) => {
  return (
    <div className={styles.authLayout}>
      <div className={styles.authFormWrapper}>
        {AUTH_FORM_WRAPPER_FLOATING_LETTERS.map((item) => (
          <div
            key={item.value}
            style={{ ...item.position }}
            className={styles.floatingLetter}
          >
            {item.value}
          </div>
        ))}
        {formElement}
      </div>
      <div className={styles.hero}>
        {HERO_FLOATING_LETTERS.map((item) => (
          <div
            key={item.value}
            style={{ ...item.position }}
            className={styles.floatingLetter}
          >
            {item.value}
          </div>
        ))}
        <h1 className={styles.heroTitle}>WRITORIUM</h1>
      </div>
    </div>
  );
};

export { AuthLayout };

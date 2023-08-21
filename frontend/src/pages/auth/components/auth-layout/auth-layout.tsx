import { type ReactNode } from 'react';

import { type FloatingLetter } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  formElement: ReactNode;
};

const AuthLayout: React.FC<Properties> = ({ formElement }) => {
  const formWrapperFloatingLetters: FloatingLetter[] = [
    { value: 'M', position: { left: -13, top: 80 } },
    { value: 'R', position: { left: -15, bottom: 50 } },
    { value: 'W', position: { right: 0, bottom: 130 } },
  ];

  const heroFloatingLetters: FloatingLetter[] = [
    { value: 'W', position: { left: 0, top: 80 } },
    { value: 'R', position: { left: 0, bottom: 30 } },
    { value: 'U', position: { right: 0, top: 50 } },
    { value: 'T', position: { right: 0, bottom: 30 } },
  ];

  return (
    <div className={styles.authLayout}>
      <div className={styles.authFormWrapper}>
        {formWrapperFloatingLetters.map((item) => (
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
        {heroFloatingLetters.map((item) => (
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

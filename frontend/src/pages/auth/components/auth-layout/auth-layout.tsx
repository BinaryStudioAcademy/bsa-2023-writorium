import { type ReactNode } from 'react';

import {
  AUTH_FORM_WRAPPER_FLOATING_LETTERS,
  HERO_FLOATING_LETTERS,
} from './libs/constants.js';
import { type FloatingLetter } from './libs/types/floating-letter.type.js';
import styles from './styles.module.scss';

type Properties = {
  formElement: ReactNode;
};

const AuthLayout: React.FC<Properties> = ({ formElement }) => {
  const renderFloatingLetters = (letters: FloatingLetter[]): ReactNode[] =>
    letters.map((item) => (
      <div
        key={item.value}
        style={{ ...item.position }}
        className={styles.floatingLetter}
      >
        {item.value}
      </div>
    ));

  return (
    <div className={styles.authLayout}>
      <div className={styles.authFormWrapper}>
        {renderFloatingLetters(AUTH_FORM_WRAPPER_FLOATING_LETTERS)}
        {formElement}
      </div>
      <div className={styles.hero}>
        {renderFloatingLetters(HERO_FLOATING_LETTERS)}
        <h1 className={styles.heroTitle}>WRITORIUM</h1>
      </div>
    </div>
  );
};

export { AuthLayout };

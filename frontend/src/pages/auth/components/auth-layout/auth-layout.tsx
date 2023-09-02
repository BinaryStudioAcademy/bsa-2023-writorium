import { type ReactNode } from 'react';

import WritoriumLogo from '~/assets/img/icons/writorium-auth-page-logo.svg';

import {
  AUTH_FORM_WRAPPER_FLOATING_LETTERS,
  HERO_FLOATING_LETTERS,
} from './libs/constants.js';
import { type FloatingLetter } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  children: ReactNode;
};

const AuthLayout: React.FC<Properties> = ({ children }) => {
  const renderFloatingLetters = (letters: FloatingLetter[]): ReactNode[] =>
    letters.map((item) => (
      <div
        key={item.key}
        style={item.position}
        className={styles.floatingLetter}
      >
        {item.value}
      </div>
    ));

  return (
    <div className={styles.authLayout}>
      <div className={styles.scrollableFormWrapper}>
        <div className={styles.formWrapper}>
          {renderFloatingLetters(AUTH_FORM_WRAPPER_FLOATING_LETTERS)}
          <div className={styles.formWrapperInner}>{children}</div>
        </div>
      </div>
      <div className={styles.hero}>
        {renderFloatingLetters(HERO_FLOATING_LETTERS)}
        <h1 className={styles.heroTitle}>
          <img src={WritoriumLogo} alt="WRITORIUM LOGO" />
        </h1>
      </div>
    </div>
  );
};

export { AuthLayout };

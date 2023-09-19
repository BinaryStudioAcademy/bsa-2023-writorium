import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';

import { IconButton } from '../components.js';
import styles from './styles.module.scss';

const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setShowButton(true);

        const position = window.scrollY;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

        setScrollValue(Math.round((position / height) * 100));
      } else {
        setShowButton(false);
        setScrollValue(0);
      }
    });
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div
      className={getValidClassNames(styles.scrollProgress, {
        [styles.containerVisibility]: showButton,
      })}
      style={{
        background: `conic-gradient(var(--light-gray-border) ${scrollValue}%, var(--white-50) ${scrollValue}%)`,
      }}
    >
      <div className={styles.backgroundCircle}>
        <IconButton
          iconName="scrollArrowUp"
          className={styles.scrollToTop}
          onClick={handleClick}
        />
      </div>
    </div>
  );
};

export { ScrollToTop };

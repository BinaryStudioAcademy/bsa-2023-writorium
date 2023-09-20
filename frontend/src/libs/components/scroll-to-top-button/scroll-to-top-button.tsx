import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';

import { IconButton } from '../icon-button/icon-button.js';
import { SCROLL_VALUE } from './libs/enums.js';
import styles from './styles.module.scss';

const ScrollToTop: React.FC = () => {
  const [hasScrollToTopButton, setHasScrollToTopButton] = useState(false);
  const [scrollValue, setScrollValue] = useState(SCROLL_VALUE.TOP as number);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > SCROLL_VALUE.SCROLLED_BELOW_200) {
        setHasScrollToTopButton(true);

        const position = window.scrollY;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;

        setScrollValue(Math.round((position / height) * 100));
      } else {
        setHasScrollToTopButton(false);
        setScrollValue(SCROLL_VALUE.TOP);
      }
    });
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: SCROLL_VALUE.TOP,
      behavior: 'smooth',
    });
  }, []);

  return (
    <div
      className={getValidClassNames(
        styles.scrollProgress,
        hasScrollToTopButton && styles.visible,
      )}
      style={{
        background: `conic-gradient(var(--light-green) ${scrollValue}%, var(--light-gray-border) ${scrollValue}%)`,
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

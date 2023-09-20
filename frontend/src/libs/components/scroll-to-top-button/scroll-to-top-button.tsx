import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';

import { IconButton } from '../icon-button/icon-button.js';
import { ScrollValue } from './libs/enums.js';
import styles from './styles.module.scss';

const maxPercentageValue = 100;

const ScrollToTop: React.FC = () => {
  const [hasScrollToTopButton, setHasScrollToTopButton] = useState(false);
  const [scrollValue, setScrollValue] = useState(ScrollValue.TOP as number);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > ScrollValue.MIN_SCROLLED_VALUE) {
        setHasScrollToTopButton(true);

        const position = window.scrollY;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrollProgress = Math.round(
          (position / height) * maxPercentageValue,
        );

        setScrollValue(scrollProgress);
      } else {
        setHasScrollToTopButton(false);
        setScrollValue(ScrollValue.TOP);
      }
    });
  }, []);

  const handleClick = useCallback(() => {
    window.scrollTo({
      top: ScrollValue.TOP,
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

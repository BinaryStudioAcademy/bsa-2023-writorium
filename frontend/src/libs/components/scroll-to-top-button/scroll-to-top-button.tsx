import { IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';

import { MAX_PERCENTAGE_VALUE } from './libs/constants/constants.js';
import { ScrollValue } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const ScrollToTop: React.FC = () => {
  const [hasScrollToTopButton, setHasScrollToTopButton] = useState(false);
  const [scrollValue, setScrollValue] = useState(ScrollValue.TOP as number);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > ScrollValue.MIN_SCROLLED_VALUE) {
        setHasScrollToTopButton(true);

        const position = window.scrollY;
        const height =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        const scrollProgress = Math.round(
          (position / height) * MAX_PERCENTAGE_VALUE,
        );

        setScrollValue(scrollProgress);
      } else {
        setHasScrollToTopButton(false);
        setScrollValue(ScrollValue.TOP);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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

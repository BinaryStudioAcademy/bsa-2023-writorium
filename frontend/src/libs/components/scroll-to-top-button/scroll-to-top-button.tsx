import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';

import { IconButton } from '../components.js';
import styles from './styles.module.scss';

const ScrollToTop: React.FC = () => {
  const [showButton, setІhowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        setІhowButton(true);
      } else {
        setІhowButton(false);
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
    <IconButton
      iconName="scrollArrowUp"
      className={getValidClassNames(styles.scrollToTop, {
        [styles.containerVisibility]: showButton,
      })}
      onClick={handleClick}
    />
  );
};

export { ScrollToTop };

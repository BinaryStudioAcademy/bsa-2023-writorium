import { type FC } from 'react';

import backgroundLetters from '~/assets/img/background-leters.png';
import backgroundTypewriter from '~/assets/img/background-typewriter.jpg';
import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getAxisOffset, getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useMemo,
  useMousePosition,
  useRef,
} from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const Landing: FC = () => {
  const { x, y } = useMousePosition();

  const lettersElementReference = useRef<HTMLImageElement | null>(null);
  const typewriterElementReference = useRef<HTMLImageElement | null>(null);

  const offsetX = useMemo(
    () =>
      getAxisOffset({
        axisValue: x,
        innerAxisValue: window.innerWidth,
      }),
    [x],
  );

  const offsetY = useMemo(
    () =>
      getAxisOffset({
        axisValue: y,
        innerAxisValue: window.innerHeight,
      }),
    [y],
  );

  const parallaxHandler = useCallback(() => {
    if (lettersElementReference.current) {
      lettersElementReference.current.style.top = `calc(${offsetY}px + 50%)`;
      lettersElementReference.current.style.left = `calc(${offsetX}px + 50%)`;
    }
    if (typewriterElementReference.current) {
      typewriterElementReference.current.style.top = `calc(50% - ${offsetY}px)`;
      typewriterElementReference.current.style.left = `calc(50% - ${offsetX}px)`;
    }
  }, [offsetX, offsetY]);

  return (
    <div className={styles.parallaxContainer} onMouseMove={parallaxHandler}>
      <Link className={styles.signLink} to={AppRoute.SIGN_IN}>
        Unbounded space for freedom of your feather
      </Link>
      <img
        ref={typewriterElementReference}
        className={getValidClassNames(styles.parallaxImg, styles.typewriterImg)}
        src={backgroundTypewriter}
        alt="typewriter"
      />
      <img
        ref={lettersElementReference}
        className={getValidClassNames(styles.parallaxImg, styles.bgLetters)}
        src={backgroundLetters}
        alt="letters"
      />
    </div>
  );
};

export { Landing };

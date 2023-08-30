import { type FC, useCallback,useRef } from 'react';

import backgroundLetters from '~/assets/img/background-leters.png';
import backgroundTypewriter from '~/assets/img/background-typewriter.jpg';
import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getAxisOffset } from '~/libs/helpers/helpers.js';
import { useMousePosition } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const Landing: FC = () => {
  const { x, y } = useMousePosition();

  const lettersElementReference = useRef<HTMLImageElement | null>(null);
  const typewriterElementReference = useRef<HTMLImageElement | null>(null);

  const parallaxHandler = useCallback(() => {
    const offsetX = getAxisOffset({
      axisValue: x,
      innerAxisValue: window.innerWidth,
    });

    const offsetY = getAxisOffset({
      axisValue: y,
      innerAxisValue: window.innerHeight,
    });

    if (lettersElementReference.current) {
      lettersElementReference.current.style.top = `calc(${offsetY}px + 50%)`;
      lettersElementReference.current.style.left = `calc(${offsetX}px + 50%)`;
    }
    if (typewriterElementReference.current) {
      typewriterElementReference.current.style.top = `calc(50% - ${offsetY}px)`;
      typewriterElementReference.current.style.left = `calc(50% - ${offsetX}px)`;
    }
  }, [x, y]);

  return (
    <div className={styles.parallaxContainer} onMouseMove={parallaxHandler}>
      <Link className={styles.signLink} to={AppRoute.SIGN_IN}>
        Unbounded space for freedom of your feather
      </Link>

      <img
        ref={lettersElementReference}
        className={`${styles.parallaxImg} ${styles.lettersImg}`}
        src={backgroundLetters}
        alt="letters"
      ></img>
      <img
        ref={typewriterElementReference}
        className={`${styles.parallaxImg} ${styles.typewriterImg}`}
        src={backgroundTypewriter}
        alt="typewriter"
      ></img>
    </div>
  );
};

export { Landing };

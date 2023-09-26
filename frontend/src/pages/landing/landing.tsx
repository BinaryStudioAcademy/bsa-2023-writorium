import backgroundLetters from '~/assets/img/background-letters.png';
import backgroundTypewriter from '~/assets/img/background-typewriter.jpg';
import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getAxisOffset, getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useMemo,
  useMousePosition,
  useReference,
} from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const Landing: React.FC = () => {
  const { x, y } = useMousePosition();

  const lettersElementReference = useReference<HTMLImageElement | null>(null);
  const typewriterElementReference = useReference<HTMLImageElement | null>(
    null,
  );

  const offsetX = useMemo(() => {
    return getAxisOffset({
      axisValue: x,
      innerAxisValue: window.innerWidth,
    });
  }, [x]);

  const offsetY = useMemo(() => {
    return getAxisOffset({
      axisValue: y,
      innerAxisValue: window.innerHeight,
    });
  }, [y]);

  const parallaxHandler = useCallback(() => {
    if (lettersElementReference.current) {
      lettersElementReference.current.style.top = `calc(${offsetY}px + 50%)`;
      lettersElementReference.current.style.left = `calc(${offsetX}px + 50%)`;
    }
    if (typewriterElementReference.current) {
      typewriterElementReference.current.style.top = `calc(50% - ${offsetY}px)`;
      typewriterElementReference.current.style.left = `calc(50% - ${offsetX}px)`;
    }
  }, [lettersElementReference, typewriterElementReference, offsetX, offsetY]);

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

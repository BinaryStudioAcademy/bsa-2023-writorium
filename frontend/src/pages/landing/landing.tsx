import { type FC } from 'react';

import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getAxisOffset } from '~/libs/helpers/helpers.js';
import { useMemo, useMousePosition } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const Landing: FC = () => {
  const { x, y } = useMousePosition();

  const backgroundPosition = useMemo(() => {
    const offsetX = getAxisOffset({
      axisValue: x,
      innerAxisValue: window.innerWidth,
    });

    const offsetY = getAxisOffset({
      axisValue: y,
      innerAxisValue: window.innerHeight,
    });

    return `
      calc(${offsetX}px + 50%) calc(${offsetY}px + 50%),
      calc(50% - ${offsetX}px) calc(50% - ${offsetY}px)
    `;
  }, [x, y]);

  return (
    <div className={styles.parallaxContainer} style={{ backgroundPosition }}>
      <Link className={styles.signLink} to={AppRoute.SIGN_IN}>
        Unbounded space for freedom of your feather
      </Link>
    </div>
  );
};

export { Landing };

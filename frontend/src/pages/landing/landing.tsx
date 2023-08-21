import { type FC } from 'react';

import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useEffect, useMousePosition, useState } from '~/libs/hooks/hooks.js';

import styles from './landing.module.scss';

const DEEP = 0.05;

const Landing: FC = () => {
  const { x, y } = useMousePosition();
  const [backgroundPosition, setBackgroundPosition] = useState('center');

  useEffect(() => {
    const offsetX = (x - window.innerWidth / 2) * DEEP;
    const offsetY = (y - window.innerHeight / 2) * DEEP;

    setBackgroundPosition(
      ` calc(${offsetX}px + 50%) calc(${offsetY}px + 50%), calc(50% - ${offsetX}px) calc(50% - ${offsetY}px) `,
    );
  }, [x, y]);

  return (
    <div className={styles.container}>
      <div className={styles.parallaxContainer} style={{ backgroundPosition }}>
        <Link className={styles.signLink} to={AppRoute.SIGN_IN}>
          Unbounded space for freedom of your feather
        </Link>
      </div>
    </div>
  );
};

export { Landing };

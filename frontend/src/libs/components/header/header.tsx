import { Avatar, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';

import styles from './styles.module.scss';

type Properties = {
  user: null;
};

const Header: React.FC<Properties> = ({ user }) => (
  <>
    {user && (
      <header className={styles.header}>
        <Link to={AppRoute.ROOT} className={styles.logo}>
          WRITORIUM
        </Link>
        <Link to={AppRoute.PROFILE}>
          <Avatar username="Todd Demoer" avatarUrl={null} />
        </Link>
      </header>
    )}
  </>
);

export { Header };

import { Link } from '~/libs/components/link/link.jsx';
import { AppRoute } from '~/libs/enums/app-route.enum';

import { Avatar } from '../avatar/avatar.jsx';
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
        <Link to={AppRoute.PROFILE} className={styles.avatarInfo}>
          <Avatar username="Todd Demoer" avatarUrl={null} />
        </Link>
      </header>
    )}
  </>
);

export { Header };

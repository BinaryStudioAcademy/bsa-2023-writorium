import avatar from '~/assets/img/user-avatar.svg';
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
        <Link to={AppRoute.PROFILE} className={styles['avatar-info']}>
          <Avatar username="" avatarUrl={avatar} />
        </Link>
      </header>
    )}
  </>
);

export { Header };

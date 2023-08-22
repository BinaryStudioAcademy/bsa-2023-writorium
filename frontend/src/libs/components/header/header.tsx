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
        <Avatar username="" avatarUrl={avatar} />
      </header>
    )}
  </>
);

export { Header };

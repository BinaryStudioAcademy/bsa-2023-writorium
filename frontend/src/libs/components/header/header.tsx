import avatar from '~/assets/img/user-avatar.svg';
import { Link } from '~/libs/components/link/link.jsx';
import { AppRoute } from '~/libs/enums/app-route.enum';

import styles from './styles.module.scss';

type Properties = {
  user: null;
};

const Header: React.FC<Properties> = ({ user }) => (
  <>
    {user && (
      <header className={styles.header}>
        <Link to={AppRoute.ROOT}>
          <span className={styles.logo}>WRITORIUM</span>
        </Link>
        <div className={styles['avatar-info']}>
          <Link to={AppRoute.PROFILE}>
            <img src={avatar} alt="avatar" className={styles.avatar} />
          </Link>
        </div>
      </header>
    )}
  </>
);

export { Header };

import { Avatar, Icon, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto | null;
};

const Header: React.FC<Properties> = ({ user }) => (
  <>
    {user && (
      <header className={styles.header}>
        <Link to={AppRoute.ROOT}>
          <Icon iconName="writoriumLogo" className={styles.logo} />
        </Link>
        <Link to={AppRoute.PROFILE}>
          <Avatar
            username={getFullName(user.firstName, user.lastName)}
            avatarUrl={null}
          />
        </Link>
      </header>
    )}
  </>
);

export { Header };

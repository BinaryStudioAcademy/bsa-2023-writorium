import { Layout } from '~/libs/components/components.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { UserInfo } from './components/components.js';
import styles from './styles.module.scss';

const Profile: React.FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user as UserAuthResponseDto,
  }));
  return (
    <Layout>
      <div className={styles.profile}>
        <UserInfo user={user} className={styles.profileBlock} />
      </div>
    </Layout>
  );
};

export { Profile };

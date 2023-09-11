import { useEffect } from 'react';

import { useAppDispatch } from '~/libs/hooks/hooks.js';
import { actions as usersActions } from '~/slices/users/users.js';

const UserArticlesGenresStats: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    void dispatch(usersActions.getUserArticlesGenresStats());
  }, [dispatch]);

  return (
    <>
      <div>
        <div>Articles Genres Stats</div>
      </div>
    </>
  );
};

export { UserArticlesGenresStats };

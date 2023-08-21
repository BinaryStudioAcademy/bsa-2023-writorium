import { Navigate } from 'react-router-dom';

import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppSelector } from '~/libs/hooks/hooks.js';

type Properties = {
  component: React.FC
};

const ProtectedRoute: React.FC<Properties> = ({ component: Component, ...rest }) => {
  const { user }  = useAppSelector( ({ auth }) => ({
    user: auth.user
  }) );

  const hasUser = Boolean(user);

  return hasUser ? (
    <Component {...rest} />
  ) : (
    <Navigate to={{ pathname: AppRoute.SIGN_IN }} />
  );
};

export { ProtectedRoute };
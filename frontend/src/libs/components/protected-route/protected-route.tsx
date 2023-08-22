import { Navigate } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';

type Properties = {
  children: React.ReactNode;
  redirectPath?: ValueOf<typeof AppRoute>;
};

const ProtectedRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.SIGN_IN,
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export { ProtectedRoute };

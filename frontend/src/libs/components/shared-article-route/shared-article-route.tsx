import { Loader, Navigate } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

type Properties = {
  children: React.ReactNode;
  redirectPath?: ValueOf<typeof AppRoute>;
};

const SharedArticleRoute: React.FC<Properties> = ({
  children,
  redirectPath = AppRoute.ARTICLES,
}) => {
  const dispatch = useAppDispatch();
  const { user, articleId, articleIdByTokenDataStatus } = useAppSelector(
    ({ auth, articles: { articleIdByToken, articleIdByTokenDataStatus } }) => ({
      user: auth.user,
      articleId: articleIdByToken,
      articleIdByTokenDataStatus: articleIdByTokenDataStatus,
    }),
  );
  const { token } = useParams();
  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasUser && token) {
      void dispatch(articlesActions.getArticleIdByToken({ token }));
    }

    return () => void dispatch(articlesActions.resetArticleIdByToken());
  }, [dispatch, hasUser, token]);

  if (hasUser) {
    const isLoading = !(
      articleIdByTokenDataStatus === DataStatus.FULFILLED ||
      articleIdByTokenDataStatus === DataStatus.REJECTED
    );

    if (!articleId && !isLoading) {
      return <Navigate to={redirectPath} />;
    }

    return (
      <Loader isLoading={isLoading} hasOverlay type="circular">
        <Navigate
          to={
            configureString(AppRoute.ARTICLES_$ID, {
              id: String(articleId),
            }) as typeof AppRoute.ARTICLES_$ID
          }
          replace
        />
      </Loader>
    );
  }

  return children;
};

export { SharedArticleRoute };

import { Layout, Loader, Navigate } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleDetails, ArticleView } from './components/components.js';
import { getArticleViewTags } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

const SharedArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { token } = useParams();

  useEffect(() => {
    if (token) {
      void dispatch(articlesActions.fetchSharedArticle({ token }));
    }
  }, [dispatch, token]);

  const { article, dataStatus } = useAppSelector(({ articles }) => ({
    article: articles.article,
    dataStatus: articles.dataStatus,
  }));

  const isLoading = !(
    dataStatus === DataStatus.FULFILLED || dataStatus == DataStatus.REJECTED
  );

  if (!article && !isLoading) {
    return <Navigate to={AppRoute.ROOT} />;
  }

  if (dataStatus === DataStatus.REJECTED) {
    return null;
  }

  return (
    <Loader isLoading={isLoading} hasOverlay type="circular">
      <Layout>
        <div className={styles.articlePageWrapper}>
          {article && (
            <>
              <ArticleView
                tags={article ? getArticleViewTags(article) : null}
                article={article}
                isShared
              />
              {article.author && (
                <ArticleDetails
                  readTime={article.readTime}
                  authorName={getFullName(
                    article.author.firstName,
                    article.author.lastName,
                  )}
                  publishedAt={article.publishedAt ?? ''}
                  genre={article.genre ?? ''}
                  avatarUrl={article.author.avatarUrl}
                />
              )}
            </>
          )}
        </div>
      </Layout>
    </Loader>
  );
};

export { SharedArticlePage };

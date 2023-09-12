import { Layout, Loader, Navigate } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleDetails, ArticleView } from './components/components.js';
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

  const MOCKED_TAGS: TagType[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'CODE' },
    { id: 3, name: 'Humor' },
    { id: 4, name: 'Work' },
    { id: 5, name: 'Tech' },
  ];

  return (
    <Loader isLoading={isLoading} hasOverlay type="circular">
      <Layout>
        <div className={styles.articlePageWrapper}>
          <ArticleView
            tags={MOCKED_TAGS}
            text={article?.text ?? ''}
            title={article?.title ?? ''}
            coverUrl={article?.coverUrl ?? ''}
            isShared
          />

          {article?.author && (
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
        </div>
      </Layout>
    </Loader>
  );
};

export { SharedArticlePage };

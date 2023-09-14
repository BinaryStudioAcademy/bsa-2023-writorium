import { Layout, Loader, Navigate } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { actions } from '~/slices/articles/articles.js';

import { ArticleDetails, ArticleView } from './components/components.js';
import { getArticleViewTags } from './libs/helpers/helpers.js';
import styles from './styles.module.scss';

const ArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams();

  useEffect(() => {
    void dispatch(actions.getArticle(Number(id)));
  }, [dispatch, id]);

  const { article, getArticleStatus } = useAppSelector(({ articles }) => ({
    article: articles.article,
    getArticleStatus: articles.getArticleStatus,
  }));

  const isLoading = !(
    getArticleStatus === DataStatus.FULFILLED ||
    getArticleStatus == DataStatus.REJECTED
  );

  if (!article && !isLoading) {
    return <Navigate to={AppRoute.ARTICLES} />;
  }

  if (getArticleStatus === DataStatus.REJECTED) {
    return null;
  }

  return (
    <Loader isLoading={isLoading} hasOverlay type="circular">
      <Layout>
        <div className={styles.articlePageWrapper}>
          <ArticleView
            tags={article ? getArticleViewTags(article) : null}
            text={article?.text ?? ''}
            title={article?.title ?? ''}
            coverUrl={article?.coverUrl ?? ''}
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

export { ArticlePage };

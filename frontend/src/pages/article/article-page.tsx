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
import { actions } from '~/slices/articles/articles.js';

import { ArticleView, AuthorDetails } from './components/components.js';
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

  const MOCKED_TAGS: TagType[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'CODE' },
    { id: 3, name: 'Humor' },
    { id: 4, name: 'Work' },
    { id: 5, name: 'Tech' },
  ];

  return (
    <Loader isLoading={isLoading}>
      <Layout>
        <div className={styles.articlePageWrapper}>
          <ArticleView
            tags={MOCKED_TAGS}
            text={article?.text ?? ''}
            title={article?.title ?? ''}
            coverUrl={article?.coverUrl ?? ''}
          />
          {article?.author && (
            <AuthorDetails
              name={getFullName(article.author.firstName, article.author.lastName)}
              avatarUrl={article.author.avatarUrl}
              publishedAt={article.publishedAt ?? ''}
              genre={article.genre ?? ''}
            />
          )}
        </div>
      </Layout>
    </Loader>
  );
};

export { ArticlePage };

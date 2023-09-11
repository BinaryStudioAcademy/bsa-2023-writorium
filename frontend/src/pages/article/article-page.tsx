import { Layout, Navigate } from '~/libs/components/components.js';
import { Loader } from '~/libs/components/loader/loader.js';
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

  const { article, dataStatus } = useAppSelector(({ articles }) => ({
    article: articles.article,
    dataStatus: articles.dataStatus,
  }));

  const isLoading = !(
    dataStatus === DataStatus.FULFILLED || dataStatus == DataStatus.REJECTED
  );

  if (!article && !isLoading) {
    return <Navigate to={AppRoute.ARTICLES} />;
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

  const { text, title, author, coverUrl } = article ?? {};

  return (
    <Loader isLoading={isLoading} hasOverlay loaderType="circular">
      <Layout>
        <div className={styles.articlePageWrapper}>
          <ArticleView
            tags={MOCKED_TAGS}
            text={text ?? ''}
            title={title ?? ''}
            coverUrl={coverUrl ?? ''}
          />
          {author && (
            <AuthorDetails
              name={getFullName(author.firstName, author.lastName)}
            />
          )}
        </div>
      </Layout>
    </Loader>
  );
};

export { ArticlePage };

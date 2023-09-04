import { Layout, Navigate } from '~/libs/components/components.js';
import { Loader } from '~/libs/components/loader/loader.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type ArticleType, type TagType } from '~/libs/types/types.js';
import { actions } from '~/slices/articles/articles.js';

import { ArticleView } from './components/article-view/article-view.jsx';
import { AuthorDetails } from './components/author-details/author-details.js';
import styles from './styles.module.scss';

const Article: React.FC = () => {
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

  const { text, title, author } = article ?? {};
  const { firstName, lastName } = author ?? {};

  return (
    <Loader isLoading={isLoading}>
      <Layout>
        <div className={styles.container}>
          <ArticleView
            article={{ text, title, tags: MOCKED_TAGS } as ArticleType}
          />
          <AuthorDetails name={`${firstName} ${lastName}`} />
        </div>
      </Layout>
    </Loader>
  );
};

export { Article };

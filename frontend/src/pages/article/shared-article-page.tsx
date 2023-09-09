import { type FC } from 'react';

import { Layout, Loader,Navigate } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type ArticleType, type TagType } from '~/libs/types/types.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleView, AuthorDetails } from './components/components.js';
import styles from './styles.module.scss';

const SharedArticlePage: FC = () => {
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

  const { text, title, author } = article ?? {};

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
          {article && (
            <ArticleView
              article={{ text, title, tags: MOCKED_TAGS } as ArticleType}
              isShared
            />
          )}
          {author && <AuthorDetails author={author} />}
        </div>
      </Layout>
    </Loader>
  );
};

export { SharedArticlePage };

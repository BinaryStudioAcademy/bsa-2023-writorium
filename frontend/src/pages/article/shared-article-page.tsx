import { type FC } from 'react';

import { Layout } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleView, Author } from './components/components.js';
import styles from './styles.module.scss';

const SharedArticlePage: FC = () => {
  const dispatch = useAppDispatch();

  const article = useAppSelector(({ articles }) => {
    const dataFromStore = articles.sharedArticle;
    if (dataFromStore) {
      return dataFromStore[0];
    }
  });

  const { token } = useParams();

  useEffect(() => {
    if (token) {
      void dispatch(articlesActions.fetchSharedArticle({ token }));
    }
  }, [dispatch, token]);

  const MOCKED_TAGS: TagType[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'CODE' },
    { id: 3, name: 'Humor' },
    { id: 4, name: 'Work' },
    { id: 5, name: 'Tech' },
  ];

  return (
    <Layout>
      <div className={styles.articlePageWrapper}>
        {article && (
          <ArticleView
            article={{
              title: article.title,
              text: article?.text,
              tags: MOCKED_TAGS,
            }}
            isShared
          />
        )}
        {article?.author && <Author author={article.author} />}
      </div>
    </Layout>
  );
};

export { SharedArticlePage };

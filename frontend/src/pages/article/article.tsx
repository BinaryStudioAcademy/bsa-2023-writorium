import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Layout } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useParams,
} from '~/libs/hooks/hooks.js';
import { type TagType } from '~/libs/types/types.js';
import { actions } from '~/slices/articles/articles.js';

import { ArticleView } from './components/article-view/article-view.jsx';
import { Author } from './components/author/author.js';
import styles from './styles.module.scss';

const Article: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  if (!id) {
    navigate(AppRoute.ARTICLES);
  }

  useEffect(() => {
    void dispatch(actions.getArticle(String(id)));
  }, [dispatch, id]);

  const { article } = useAppSelector(({ articles }) => ({
    article: articles.article,
  }));

  if (!article) {
    navigate(AppRoute.ARTICLES);
  }

  const { text, title } = article;

  const MOCKED_TAGS: TagType[] = [
    { id: 1, name: 'IT' },
    { id: 2, name: 'CODE' },
    { id: 3, name: 'Humor' },
    { id: 4, name: 'Work' },
    { id: 5, name: 'Tech' },
  ];

  const ARTICLE = {
    title,
    text,
    tags: MOCKED_TAGS,
  };

  return (
    <Layout>
      <div className={styles.container}>
        <ArticleView article={ARTICLE} />
        {id && <Author />}
      </div>
    </Layout>
  );
};

export { Article };

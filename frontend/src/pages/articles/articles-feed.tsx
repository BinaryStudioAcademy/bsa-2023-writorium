import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleCard } from './components/components.js';
import { MOCKED_TAGS } from './libs/constants.js';

const ArticlesFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(({ articles }) => articles);

  useEffect(() => {
    void dispatch(articlesActions.fetchAll());
  }, [dispatch]);

  return (
    <>
      {Boolean(articles.length) &&
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            author={article.author!}
            tags={MOCKED_TAGS}
            reactions={article.reactions!}
          />
        ))}
    </>
  );
};

export { ArticlesFeed };

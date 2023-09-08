import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleCard } from './components/components.js';
import { MOCKED_REACTIONS } from './libs/constants.js';
import { getArticleTags } from './libs/helpers/helpers.js';

const MyArticles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(({ articles }) => articles);

  useEffect(() => {
    void dispatch(articlesActions.fetchOwn());
  }, [dispatch]);

  return (
    <>
      {Boolean(articles.length) &&
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            author={article.author!}
            tags={getArticleTags(article)}
            reactions={MOCKED_REACTIONS}
          />
        ))}
    </>
  );
};

export { MyArticles };

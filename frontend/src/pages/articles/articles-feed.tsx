import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { type UserDetailsResponseDto } from '~/packages/users/users.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleCard } from './components/components.js';
import { MOCKED_REACTIONS, MOCKED_TAGS } from './libs/constants.js';

const ArticlesFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state) => state.articles);

  const handleGetFeed = useCallback(() => {
    void dispatch(articlesActions.loadAll());
  }, [dispatch]);

  useEffect(() => {
    handleGetFeed();
  }, [handleGetFeed]);

  return (
    <>
      {articles?.every((article) => article.userDetails) &&
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            user={article.userDetails as UserDetailsResponseDto}
            tags={MOCKED_TAGS}
            reactions={MOCKED_REACTIONS}
          />
        ))}
    </>
  );
};

export { ArticlesFeed };

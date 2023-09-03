import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { type UserDetailsResponseDto } from '~/packages/users/users.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleCard } from './components/components.js';
import { MOCKED_REACTIONS, MOCKED_TAGS } from './libs/constants.js';

const ArticlesFeed: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector(({ articles }) => articles);

  useEffect(() => {
    void dispatch(articlesActions.fetchAll());
  }, [dispatch]);

  return (
    <>
      {articles.length > 0 &&
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            author={article.author as UserDetailsResponseDto}
            tags={MOCKED_TAGS}
            reactions={MOCKED_REACTIONS}
          />
        ))}
    </>
  );
};

export { ArticlesFeed };

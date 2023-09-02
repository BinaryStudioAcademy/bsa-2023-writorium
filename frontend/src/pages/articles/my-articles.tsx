import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { type UserDetailsResponseDto } from '~/packages/users/users.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { ArticleCard } from './components/components.js';
import { MOCKED_REACTIONS, MOCKED_TAGS } from './libs/constants.js';

const MyArticles: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, user } = useAppSelector(({ articles, auth }) => ({
    articles: articles.articles,
    user: auth.user,
  }));

  const author = {
    firstName: user?.firstName,
    lastName: user?.lastName,
  } as UserDetailsResponseDto;

  useEffect(() => {
    void dispatch(articlesActions.fetchOwn());
  }, [dispatch]);

  return (
    <>
      {articles &&
        articles.map((article) => (
          <ArticleCard
            key={article.id}
            article={article}
            author={author}
            tags={MOCKED_TAGS}
            reactions={MOCKED_REACTIONS}
          />
        ))}
    </>
  );
};

export { MyArticles };

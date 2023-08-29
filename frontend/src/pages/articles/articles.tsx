import { Button, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useLocation } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ArticleCard } from './components/components.js';
import { type ArticleType } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  articles: ArticleType[];
  user: UserAuthResponseDto;
};

const Articles: React.FC<Properties> = ({ articles, user }) => {
  const { pathname } = useLocation();
  const activePage = pathname.split('/').pop();

  const handleShowFeed = useCallback(() => {}, []);

  const handleShowMyArticles = useCallback(() => {}, []);

  useEffect(() => {
    if (activePage === AppRoute.FEED) {
      return handleShowFeed();
    }

    if (activePage === AppRoute.MY_ARTICLES) {
      return handleShowMyArticles();
    }
  }, [handleShowFeed, handleShowMyArticles, activePage]);

  const renderArticles = articles.map((article) => (
    <ArticleCard key={article.id} article={article} user={user} />
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        <Link to={AppRoute.FEED}>
          <Button
            label="Feed"
            onClick={handleShowFeed}
            className={getValidClassNames(
              styles.button,
              activePage === AppRoute.FEED && styles.activeButton,
            )}
          />
        </Link>
        <Link to={AppRoute.MY_ARTICLES}>
          <Button
            label="My articles"
            onClick={handleShowMyArticles}
            className={getValidClassNames(
              styles.button,
              activePage === AppRoute.MY_ARTICLES && styles.activeButton,
            )}
          />
        </Link>
      </div>
      <div className={styles.articles}>{renderArticles}</div>
    </div>
  );
};

export { Articles };

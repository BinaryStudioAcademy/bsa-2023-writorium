import { Button } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ArticleCard } from './components/components.js';
import { ActivePage } from './libs/constants.js';
import { type ArticleType } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  articles: ArticleType[];
  user: UserAuthResponseDto;
};

const Articles: React.FC<Properties> = ({ articles, user }) => {
  const [currentPage, setCurrentPage] = useState<ValueOf<typeof ActivePage>>(
    ActivePage.FEED,
  );

  const handleShowFeed = useCallback(() => {
    setCurrentPage(ActivePage.FEED);
  }, []);

  const handleShowArticles = useCallback(() => {
    setCurrentPage(ActivePage.ARTICLES);
  }, []);

  const renderArticles = articles.map((article) => (
    <ArticleCard key={article.id} article={article} user={user} />
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        <Button
          label="Feed"
          onClick={handleShowFeed}
          className={getValidClassNames(
            styles.button,
            currentPage === ActivePage.FEED && styles.activeButton,
          )}
        />
        <Button
          label="My articles"
          onClick={handleShowArticles}
          className={getValidClassNames(
            styles.button,
            currentPage === ActivePage.ARTICLES && styles.activeButton,
          )}
        />
      </div>
      <div className={styles.articles}>{renderArticles}</div>
    </div>
  );
};

export { Articles };

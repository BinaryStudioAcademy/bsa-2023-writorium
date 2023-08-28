import { Button } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ArticleCard } from './components/article-card/article-card.js';
import { type ArticleType } from './libs/types/types.js';
import styles from './styles.module.scss';

type Properties = {
  articles: ArticleType[];
  user: UserAuthResponseDto;
};

const Articles: React.FC<Properties> = ({ articles, user }) => {
  const renderArticles = articles.map((article) => (
    <ArticleCard key={article.id} article={article} user={user} />
  ));

  return (
    <div className={styles.wrapper}>
      <div className={styles.buttonsWrapper}>
        <Button label="Feed" className={getValidClassNames(styles.button)} />
        <Button
          label="My articles"
          className={getValidClassNames(styles.button)}
        />
      </div>
      <div className={styles.articles}>{renderArticles}</div>
    </div>
  );
};

export { Articles };

import { Button } from '~/libs/components/components.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ArticleCard } from './components/article-card/article-card.js';
import { type ArticleType } from './libs/types/types.js';

type Properties = {
  articles: ArticleType[];
  user: UserAuthResponseDto;
};

const Articles: React.FC<Properties> = ({ articles, user }) => {
  const renderArticles = articles.map((article) => (
    <ArticleCard key={article.id} article={article} user={user} />
  ));

  return (
    <div>
      <div>
        <Button label="Feed" />
        <Button label="My articles" />
      </div>
      <div>{renderArticles}</div>
    </div>
  );
};

export { Articles };

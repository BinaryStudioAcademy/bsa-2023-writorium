import { ArticleCard } from './components/components.js';
import { MOCKED_ARTICLES, MOCKED_USER } from './libs/constants.js';

const MyArticles: React.FC = () => (
  <>
    {MOCKED_ARTICLES.map((article) => (
      <ArticleCard key={article.id} article={article} user={MOCKED_USER} />
    ))}
  </>
);

export { MyArticles };

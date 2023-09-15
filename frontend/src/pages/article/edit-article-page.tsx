import { Layout, Navigate } from '~/libs/components/components.js';
import { AppRoute, ArticleSubRoute } from '~/libs/enums/enums.js';
import { useLocation } from '~/libs/hooks/hooks.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

import {
  ArticleForm,
  ArticleImprovementSuggestions,
} from './components/components.js';
import styles from './styles.module.scss';

const EditArticlePage: React.FC = () => {
  const location = useLocation();
  const article = location.state as ArticleResponseDto;

  if (!article) {
    return (
      <Navigate to={`${AppRoute.ARTICLES}/${ArticleSubRoute.MY_ARTICLES}`} />
    );
  }

  return (
    <Layout>
      <div className={styles.editArticlePage}>
        <div className={styles.leftColumn}>
          <ArticleForm articleForUpdate={article} />
        </div>
        <div className={styles.rightColumn}>
          <ArticleImprovementSuggestions id={article.id} />
        </div>
      </div>
    </Layout>
  );
};

export { EditArticlePage };

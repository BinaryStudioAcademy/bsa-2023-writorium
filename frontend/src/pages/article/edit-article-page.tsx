import { Layout, Navigate } from '~/libs/components/components.js';
import { ArticleSubRoute } from '~/libs/enums/enums.js';
import { useLocation } from '~/libs/hooks/hooks.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

import { ArticleForm } from './components/components.js';
import styles from './styles.module.scss';

const EditArticlePage: React.FC = () => {
  const location = useLocation();
  if (!location.state) {
    return <Navigate to={ArticleSubRoute.MY_ARTICLES} />;
  }
  return (
    <Layout>
      <div className={styles.articleCreatePageWrapper}>
        <ArticleForm articleForUpdate={location.state as ArticleResponseDto} />
      </div>
    </Layout>
  );
};

export { EditArticlePage };

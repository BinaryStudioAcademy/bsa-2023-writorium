import { Layout } from '~/libs/components/components.js';
import { useLocation } from '~/libs/hooks/hooks.js';
import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';

import { ArticleForm } from './components/components.js';
import styles from './styles.module.scss';

const EditArticlePage: React.FC = () => {
  const location = useLocation();
  return (
    <Layout>
      <div className={styles.articleCreatePageWrapper}>
        <ArticleForm
          articleForUpdate={location.state as ArticleWithAuthorType}
        />
      </div>
    </Layout>
  );
};

export { EditArticlePage };

import { Layout, PromptGeneration } from '~/libs/components/components.js';

import { ArticleForm } from './components/components.js';
import styles from './styles.module.scss';

const CreateArticlePage: React.FC = () => (
  <Layout>
    <div className={styles.articleCreatePageWrapper}>
      <PromptGeneration />
      <div className={styles.articleFormWrapper}>
        <ArticleForm />
      </div>
    </div>
  </Layout>
);

export { CreateArticlePage };

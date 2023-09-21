import {
  Layout,
  Popover,
  PromptGeneration,
} from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import { ArticleForm } from './components/components.js';
import styles from './styles.module.scss';

const CreateArticlePage: React.FC = () => (
  <Layout>
    <div className={styles.articleCreatePageWrapper}>
      <h1 className={styles.header}>Write your own story</h1>
      <PromptGeneration />
      <Popover
        content={
          <PromptGeneration containerStyle={styles.promptGenerationContainer} />
        }
        className={getValidClassNames(
          styles.authorDetails,
          styles.authorDetailsModal,
        )}
      >
        <p className={styles.showPrompt}>Show prompt</p>
      </Popover>
      <div className={styles.articleFormWrapper}>
        <ArticleForm />
      </div>
    </div>
  </Layout>
);

export { CreateArticlePage };

import {
  Button,
  Layout,
  Popover,
  PromptGeneration,
} from '~/libs/components/components.js';

import { ArticleForm } from './components/components.js';
import styles from './styles.module.scss';

const CreateArticlePage: React.FC = () => (
  <Layout>
    <div className={styles.articleCreatePageWrapper}>
      <h1 className={styles.header}>Write your own story</h1>
      <Popover
        content={
          <PromptGeneration
            containerStyle={styles.mobilePromptGenerationContainer}
          />
        }
        className={styles.popover}
        classNameContentWrapper={styles.promptGenerationModal}
        isClosingOnChildrenClick
      >
        <Button
          variant="text"
          label="Show prompt"
          className={styles.showPrompt}
        />
      </Popover>
      <div className={styles.mainContentWrapper}>
        <div className={styles.leftColumn}>
          <ArticleForm />
        </div>
        <div className={styles.rightColumn}>
          <PromptGeneration />
        </div>
      </div>
    </div>
  </Layout>
);

export { CreateArticlePage };

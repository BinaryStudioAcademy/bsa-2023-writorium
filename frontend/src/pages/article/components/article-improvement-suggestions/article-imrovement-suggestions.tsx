import { IconButton } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const ArticleImprovementSuggestions: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.ctaText}>
          Enhance your article to make it stand out!
        </div>
        <IconButton
          iconName="autoFix"
          className={styles.suggestImprovementsButton}
          label="Suggest Improvements"
        />
      </div>
    </div>
  );
};

export { ArticleImprovementSuggestions };

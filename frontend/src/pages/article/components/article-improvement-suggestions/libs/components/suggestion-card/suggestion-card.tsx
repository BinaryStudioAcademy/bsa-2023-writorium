import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';
import { ArticleImprovementSuggestionPriority } from '~/packages/articles/articles.js';

import styles from './styles.module.scss';

type Properties = {
  title: string;
  description: string;
  priority: ValueOf<typeof ArticleImprovementSuggestionPriority>;
};

const SuggestionCard: React.FC<Properties> = ({
  title,
  description,
  priority,
}) => {
  const priorityClassName = {
    [ArticleImprovementSuggestionPriority.LOW]: styles.low,
    [ArticleImprovementSuggestionPriority.MEDIUM]: styles.medium,
    [ArticleImprovementSuggestionPriority.HIGH]: styles.high,
  }[priority];

  const priorityDisplayText = {
    [ArticleImprovementSuggestionPriority.LOW]: 'Low',
    [ArticleImprovementSuggestionPriority.MEDIUM]: 'Medium',
    [ArticleImprovementSuggestionPriority.HIGH]: 'High',
  }[priority];

  return (
    <li className={getValidClassNames(styles.suggestion, priorityClassName)}>
      <div className={styles.suggestionHeader}>
        <h4>{title}</h4>
        <div className={styles.priorityLabel}>
          <span className={styles.priorityText}>Priority: </span>
          <span
            className={getValidClassNames(
              styles.priorityLabelTag,
              priorityClassName,
            )}
          >
            {priorityDisplayText}
          </span>
        </div>
      </div>
      <p className={styles.suggestionDescription}>{description}</p>
    </li>
  );
};

export { SuggestionCard };

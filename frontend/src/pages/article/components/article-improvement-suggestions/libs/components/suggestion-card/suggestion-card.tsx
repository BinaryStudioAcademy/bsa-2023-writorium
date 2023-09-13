import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import { ArticleSuggestionPriority } from '../../enums/enums.js';
import styles from './styles.module.scss';

type Properties = {
  title: string;
  description: string;
  priority: ValueOf<typeof ArticleSuggestionPriority>;
};

const SuggestionCard: React.FC<Properties> = ({
  title,
  description,
  priority,
}) => {
  const priorityClassName = {
    [ArticleSuggestionPriority.Low]: styles.low,
    [ArticleSuggestionPriority.Medium]: styles.medium,
    [ArticleSuggestionPriority.High]: styles.high,
  }[priority];

  const priorityDisplayText = {
    [ArticleSuggestionPriority.Low]: 'Low',
    [ArticleSuggestionPriority.Medium]: 'Medium',
    [ArticleSuggestionPriority.High]: 'High',
  } as const;

  return (
    <li className={getValidClassNames(styles.suggestion, priorityClassName)}>
      <div className={styles.suggestionHeader}>
        <h4>{title}</h4>
        <div>
          <span className={styles.priorityText}>Priority: </span>
          <span
            className={getValidClassNames(
              styles.priorityLabel,
              priorityClassName,
            )}
          >
            {priorityDisplayText[priority]}
          </span>
        </div>
      </div>
      <p className={styles.suggestionDescription}>{description}</p>
    </li>
  );
};

export { SuggestionCard };

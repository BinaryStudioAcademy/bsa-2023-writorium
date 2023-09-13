import { IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

const SuggestionPriority = {
  Low: 1,
  Medium: 2,
  High: 3,
} as const;

const ArticleImprovementSuggestions: React.FC = () => {
  const items: {
    title: string;
    description: string;
    priority: ValueOf<typeof SuggestionPriority>;
  }[] = [
    {
      priority: SuggestionPriority.High,
      title: 'Clarity and Structure',
      description:
        'The article could benefit from a clearer structure. It starts by discussing common misconceptions about dialects and languages but then jumps to a quote from linguist John McWhorter. Consider structuring it to flow more logically, perhaps by first defining dialects and languages and then addressing the myth.',
    },
    {
      priority: SuggestionPriority.Low,
      title: 'Define Dialect and Language Clearly',
      description:
        'Begin by providing concise definitions of "dialect" and "language" to ensure readers understand the terms from the outset. This will provide a solid foundation for the discussion.',
    },
    {
      priority: SuggestionPriority.Medium,
      title: 'Elaborate on the Myth',
      description:
        'When addressing the myth about dialects being seen as "imperfect" or "mysterious," provide concrete examples or historical context to make it more engaging and relatable to readers. Explain where this misconception comes from.',
    },
  ];

  const priorityDisplayMapper = {
    [SuggestionPriority.Low]: 'Low',
    [SuggestionPriority.Medium]: 'Medium',
    [SuggestionPriority.High]: 'High',
  };

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
        <div className={styles.suggestionsListTitle}>
          <div className={styles.suggestionsCount}>{items.length}</div>
          <h3>All suggestions</h3>
        </div>
        <ul className={styles.suggestionsList}>
          {items.map((item) => {
            return (
              <li
                className={getValidClassNames(
                  styles.suggestion,
                  item.priority === SuggestionPriority.Low && styles.low,
                  item.priority === SuggestionPriority.Medium && styles.medium,
                  item.priority === SuggestionPriority.High && styles.high,
                )}
                key={item.title}
              >
                <div className={styles.suggestionHeader}>
                  <h4>{item.title}</h4>
                  <div>
                    <span className={styles.priorityText}>Priority: </span>
                    <span
                      className={getValidClassNames(
                        styles.priorityLabel,
                        item.priority === SuggestionPriority.Low && styles.low,
                        item.priority === SuggestionPriority.Medium &&
                          styles.medium,
                        item.priority === SuggestionPriority.High &&
                          styles.high,
                      )}
                    >
                      {priorityDisplayMapper[item.priority]}
                    </span>
                  </div>
                </div>
                <p className={styles.suggestionDescription}>
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { ArticleImprovementSuggestions };

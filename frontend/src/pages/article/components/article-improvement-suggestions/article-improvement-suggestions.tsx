import { IconButton } from '~/libs/components/components.js';
import { type ValueOf } from '~/libs/types/types.js';

import { SuggestionCard } from './libs/components/components.js';
import { ArticleSuggestionPriority } from './libs/enums/enums.js';
import styles from './styles.module.scss';

const mockSuggestions: {
  title: string;
  description: string;
  priority: ValueOf<typeof ArticleSuggestionPriority>;
}[] = [
  {
    priority: ArticleSuggestionPriority.High,
    title: 'Clarity and Structure',
    description:
      'The article could benefit from a clearer structure. It starts by discussing common misconceptions about dialects and languages but then jumps to a quote from linguist John McWhorter. Consider structuring it to flow more logically, perhaps by first defining dialects and languages and then addressing the myth.',
  },
  {
    priority: ArticleSuggestionPriority.Low,
    title: 'Define Dialect and Language Clearly',
    description:
      'Begin by providing concise definitions of "dialect" and "language" to ensure readers understand the terms from the outset. This will provide a solid foundation for the discussion.',
  },
  {
    priority: ArticleSuggestionPriority.Medium,
    title: 'Elaborate on the Myth',
    description:
      'When addressing the myth about dialects being seen as "imperfect" or "mysterious," provide concrete examples or historical context to make it more engaging and relatable to readers. Explain where this misconception comes from.',
  },
];

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
        <div className={styles.suggestionsListTitle}>
          <div className={styles.suggestionsCount}>
            {mockSuggestions.length}
          </div>
          <h3>All suggestions</h3>
        </div>
        <ul className={styles.suggestionsList}>
          {mockSuggestions.map((item) => {
            return (
              <SuggestionCard
                key={item.title}
                title={item.title}
                description={item.description}
                priority={item.priority}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export { ArticleImprovementSuggestions };

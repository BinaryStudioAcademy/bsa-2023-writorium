import { IconButton } from '~/libs/components/components.js';
import { useAppDispatch, useAppSelector } from '~/libs/hooks/hooks.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { SuggestionCard } from './libs/components/components.js';
import styles from './styles.module.scss';

type Properties = {
  articleId: number;
};

const ArticleImprovementSuggestions: React.FC<Properties> = ({ articleId }) => {
  const dispatch = useAppDispatch();
  const { improvementSuggestions } = useAppSelector(({ articles }) => ({
    improvementSuggestions: articles.improvementSuggestions,
    improvementSuggestionsDataStatus: articles.improvementSuggestionsDataStatus,
  }));

  const handleSuggestImprovement = (): void => {
    void dispatch(articlesActions.getImprovementSuggestions(articleId));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        <div className={styles.ctaText}>
          Enhance your article to make it stand out!
        </div>
        <IconButton
          iconName="autoFix"
          label="Suggest Improvements"
          onClick={handleSuggestImprovement}
          className={styles.suggestImprovementsButton}
        />
        <div className={styles.suggestionsListTitle}>
          <div className={styles.suggestionsCount}>
            {improvementSuggestions.length}
          </div>
          <h3>All suggestions</h3>
        </div>
        <ul className={styles.suggestionsList}>
          {improvementSuggestions.map((item) => {
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

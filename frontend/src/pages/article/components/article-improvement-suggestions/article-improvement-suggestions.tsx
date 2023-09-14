import { IconButton, Loader } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import { useAppDispatch, useAppSelector } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { SuggestionCard } from './libs/components/components.js';
import styles from './styles.module.scss';

type Properties = {
  articleId: number;
};

const ArticleImprovementSuggestions: React.FC<Properties> = ({ articleId }) => {
  const dispatch = useAppDispatch();
  const { improvementSuggestions, dataStatus } = useAppSelector(
    ({ articles }) => ({
      improvementSuggestions: articles.improvementSuggestions,
      dataStatus: articles.improvementSuggestionsDataStatus,
    }),
  );

  const handleSuggestImprovement = (): void => {
    void dispatch(articlesActions.getImprovementSuggestions(articleId));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapperInner}>
        {dataStatus !== DataStatus.PENDING && (
          <div className={styles.ctaText}>
            Enhance your article to make it stand out!
          </div>
        )}
        {(
          [DataStatus.IDLE, DataStatus.REJECTED] as ValueOf<typeof DataStatus>[]
        ).includes(dataStatus) && (
          <IconButton
            iconName="autoFix"
            label="Suggest Improvements"
            onClick={handleSuggestImprovement}
            className={styles.suggestImprovementsButton}
          />
        )}
        {dataStatus === DataStatus.PENDING && (
          <div>
            <Loader isLoading type="dots" />
            <p className={styles.loadingDescription}>
              Just a moment! <br /> Our AI is hard at work analyzing your
              article.
            </p>
          </div>
        )}
        {dataStatus === DataStatus.FULFILLED && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export { ArticleImprovementSuggestions };

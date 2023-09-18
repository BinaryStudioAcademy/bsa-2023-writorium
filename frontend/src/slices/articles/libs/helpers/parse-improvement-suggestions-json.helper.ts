import { safeJSONParse } from '~/libs/helpers/helpers.js';
import { type ArticleImprovementSuggestion } from '~/packages/articles/articles.js';

const parseImprovementSuggestionsJSON = (
  suggestionsJSON: string | null,
): Record<string, ArticleImprovementSuggestion[]> => {
  if (!suggestionsJSON) {
    return {};
  }

  return (
    safeJSONParse<Record<string, ArticleImprovementSuggestion[]>>(
      suggestionsJSON,
    ) ?? {}
  );
};

export { parseImprovementSuggestionsJSON };

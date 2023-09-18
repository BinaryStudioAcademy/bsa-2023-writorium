import { type ValueOf } from '~/libs/types/types.js';

import { type ArticleImprovementSuggestionPriority } from '../enums/enums.js';

type ArticleImprovementSuggestion = {
  title: string;
  description: string;
  priority: ValueOf<typeof ArticleImprovementSuggestionPriority>;
};

export { type ArticleImprovementSuggestion };

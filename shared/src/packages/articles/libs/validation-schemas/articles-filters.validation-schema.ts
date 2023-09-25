import joi from 'joi';

import { ArticleValidationRule } from '../enums/article-validation-rule.enum.js';
import { type ArticlesFilters } from '../types/articles-filters.type.js';

const articlesFilters = joi.object<ArticlesFilters, true>({
  skip: joi
    .number()
    .integer()
    .min(ArticleValidationRule.ARTICLES_PAGINATION_MIN_SKIP)
    .required(),
  take: joi.number().integer().positive().required(),
  genreId: joi.number().integer().positive(),
  titleFilter: joi.string().trim(),
  authorId: joi.number().integer().positive(),
  shouldShowFavourites: joi.boolean(),
});

export { articlesFilters };

import joi from 'joi';

import { type ArticlesFilters } from '../types/articles-filters.type.js';

const articlesFormFilters = joi.object<Partial<ArticlesFilters>>({
  genreId: joi.number().integer().allow(null),
  titleFilter: joi.string().trim().allow(''),
  authorId: joi.number().integer().allow(null),
});

export { articlesFormFilters };

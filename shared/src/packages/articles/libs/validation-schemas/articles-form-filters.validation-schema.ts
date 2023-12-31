import joi from 'joi';

import { type ArticlesFilters } from '../types/articles-filters.type.js';

const articlesFormFilters = joi.object<Partial<ArticlesFilters>>({
  genreId: joi.number().integer().positive().allow(null),
  titleFilter: joi.string().trim().allow(''),
  authorId: joi.number().integer().positive().allow(null),
});

export { articlesFormFilters };

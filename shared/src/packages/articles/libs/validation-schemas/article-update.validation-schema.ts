import joi from 'joi';

import {
  ArticleValidationMessage,
  ArticleValidationRule,
} from '~/packages/articles/libs/enums/enums.js';
import { type ArticleRequestDto } from '~/packages/articles/libs/types/types.js';

const articleUpdate = joi
  .object<ArticleRequestDto, true>({
    title: joi
      .string()
      .min(ArticleValidationRule.ARTICLE_TITLE_MIN_LENGTH)
      .max(ArticleValidationRule.ARTICLE_TITLE_MAX_LENGTH)
      .trim()
      .messages({
        'string.min': ArticleValidationMessage.ARTICLE_TITLE_MIN_LENGTH,
        'string.max': ArticleValidationMessage.ARTICLE_TITLE_MAX_LENGTH,
      }),
    text: joi
      .string()
      .min(ArticleValidationRule.ARTICLE_TEXT_MIN_LENGTH)
      .trim()
      .messages({
        'string.min': ArticleValidationMessage.ARTICLE_TEXT_MIN_LENGTH,
      }),
    promptId: joi.number().integer().positive().allow(null),
    genreId: joi.number().integer().positive().allow(null),
    publishedAt: joi.string().isoDate().allow(null).messages({
      'string.isoDate': ArticleValidationMessage.ARTICLE_PUBLISHED_ISO_DATE,
    }),
    coverId: joi.number().integer().positive().allow(null),
  })
  .min(ArticleValidationRule.ARTICLE_UPDATE_MINIMUM_NUMBER_OF_KEYS)
  .messages({
    'object.min':
      ArticleValidationMessage.ARTICLE_UPDATE_MINIMUM_NUMBER_OF_KEYS,
  });

export { articleUpdate };

import joi from 'joi';

import {
  ArticleValidationMessage,
  ArticleValidationRule,
} from '~/packages/articles/libs/enums/enums.js';
import { type ArticleCreateRequestDto } from '~/packages/articles/libs/types/types.js';

const articleCreate = joi.object<ArticleCreateRequestDto, true>({
  title: joi
    .string()
    .min(ArticleValidationRule.ARTICLE_TITLE_MIN_LENGTH)
    .max(ArticleValidationRule.ARTICLE_TITLE_MAX_LENGTH)
    .trim()
    .required()
    .messages({
      'string.min': ArticleValidationMessage.ARTICLE_TITLE_MIN_LENGTH,
      'string.max': ArticleValidationMessage.ARTICLE_TITLE_MAX_LENGTH,
      'string.empty': ArticleValidationMessage.ARTICLE_TITLE_REQUIRE,
    }),
  text: joi
    .string()
    .min(ArticleValidationRule.ARTICLE_TEXT_MIN_LENGTH)
    .trim()
    .required()
    .messages({
      'string.min': ArticleValidationMessage.ARTICLE_TEXT_MIN_LENGTH,
      'string.empty': ArticleValidationMessage.ARTICLE_TEXT_REQUIRE,
    }),
  promptId: joi.number().integer().positive(),
  genreId: joi.number().integer().positive().required().messages({
    'string.empty': ArticleValidationMessage.ARTICLE_GENRE_ID_REQUIRE,
  }),
  publishedAt: joi.string().isoDate().messages({
    'string.isoDate': ArticleValidationMessage.ARTICLE_PUBLISHED_ISO_DATE,
  }),
});

export { articleCreate };

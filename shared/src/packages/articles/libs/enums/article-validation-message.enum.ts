import { ArticleValidationRule } from '~/packages/articles/libs/enums/article-validation-rule.enum.js';

const ArticleValidationMessage = {
  ARTICLE_TITLE_REQUIRE: 'Title is required',
  ARTICLE_TITLE_MIN_LENGTH: `Title must contain at least ${ArticleValidationRule.ARTICLE_TITLE_MIN_LENGTH} characters`,
  ARTICLE_TITLE_MAX_LENGTH: `Title should contain no more than ${ArticleValidationRule.ARTICLE_TITLE_MAX_LENGTH} characters`,
  ARTICLE_TEXT_REQUIRE: 'Text is required',
  ARTICLE_TEXT_MIN_LENGTH: `Text must contain at least ${ArticleValidationRule.ARTICLE_TEXT_MIN_LENGTH} characters`,
  ARTICLE_PUBLISHED_ISO_DATE:
    'The date of publication should be in ISO 8601 format',
  ARTICLE_UPDATE_MINIMUM_NUMBER_OF_KEYS: `The minimum number of keys to update an article is ${ArticleValidationRule.ARTICLE_UPDATE_MINIMUM_NUMBER_OF_KEYS}`,
} as const;

export { ArticleValidationMessage };

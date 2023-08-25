const ArticleValidationMessage = {
  ARTICLE_TITLE_REQUIRE: 'Title is required',
  ARTICLE_TITLE_MIN_LENGTH: 'Title must contain at least 3 characters',
  ARTICLE_TITLE_MAX_LENGTH: 'Title should contain no more than 30 characters',
  ARTICLE_TEXT_REQUIRE: 'Text is required',
  ARTICLE_TEXT_MIN_LENGTH: 'Title must contain at least 50 characters',
  ARTICLE_GENRE_ID_REQUIRE: 'Genre id is required',
  ARTICLE_PUBLISHED_ISO_DATE:
    'The date of publication should be in ISO 8601 format',
  ARTICLE_UPDATE_MINIMUM_NUMBER_OF_KEYS:
    'The minimum number of keys to update an article is 1',
} as const;

export { ArticleValidationMessage };

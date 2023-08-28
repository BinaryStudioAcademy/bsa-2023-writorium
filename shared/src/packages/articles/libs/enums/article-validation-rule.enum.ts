const ArticleValidationRule = {
  ARTICLE_TITLE_MIN_LENGTH: 3,
  ARTICLE_TITLE_MAX_LENGTH: 30,
  ARTICLE_TEXT_MIN_LENGTH: 50,
  ARTICLE_UPDATE_MINIMUM_NUMBER_OF_KEYS: 1,
} as const;

export { ArticleValidationRule };

import { makeFirstLettersCapitalized } from '~/libs/helpers/helpers.js';
import { type SelectOption } from '~/libs/types/types.js';
import { ArticlePublishStatus } from '~/packages/articles/articles.js';

const articleStatusOptions: SelectOption[] = [
  {
    label: makeFirstLettersCapitalized(ArticlePublishStatus.PUBLISHED),
    value: ArticlePublishStatus.PUBLISHED,
  },
  {
    label: makeFirstLettersCapitalized(ArticlePublishStatus.DRAFT),
    value: ArticlePublishStatus.DRAFT,
  },
];

export { articleStatusOptions };

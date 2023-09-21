import { type SelectOption } from '~/libs/types/types.js';
import { ArticlePublishStatus } from '~/packages/articles/articles.js';

const articleStatusOptions: SelectOption[] = [
  { label: 'Published', value: ArticlePublishStatus.PUBLISHED },
  { label: 'Draft', value: ArticlePublishStatus.DRAFT },
];

export { articleStatusOptions };

import { type TagType } from '~/libs/types/types.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

import { getArticleTags } from '../../../articles/libs/helpers/get-article-tags.js';

const getArticleViewTags = (article: ArticleResponseDto): TagType[] | null => {
  const tags = getArticleTags(article);
  if (tags.length > 0) {
    return tags.filter((tag) => tag.category !== 'genre');
  }
  return null;
};

export { getArticleViewTags };

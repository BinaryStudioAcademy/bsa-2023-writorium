import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';

import { type TagType } from '../types/types.js';

const getArticleTags = (article: ArticleWithAuthorType): TagType[] => {
  const result: TagType[] = [];
  if (article.genre) {
    result.push({
      id: crypto.randomUUID(),
      category: 'genre',
      text: article.genre,
    });
  }
  if (article.prompt) {
    for (const [key, value] of Object.entries(article.prompt)) {
      if (value) {
        result.push({ id: crypto.randomUUID(), category: key, text: value });
      }
    }
  }
  return result;
};

export { getArticleTags };

import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';

import { type TagType } from '../types/types.js';

const getArticleTags = (article: ArticleWithAuthorType): TagType[] => {
  const result: TagType[] = [];
  const { prompt, genre } = article;

  if (genre) {
    result.push({
      category: 'genre',
      text: genre,
    });
  }
  if (prompt) {
    let keys: keyof typeof prompt;
    for (keys in prompt) {
      const value = prompt[keys];
      if (value) {
        result.push({ category: keys, text: value });
      }
    }
  }
  return result;
};

export { getArticleTags };

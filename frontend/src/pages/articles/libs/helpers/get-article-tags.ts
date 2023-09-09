import { type ArticleWithRelationsType } from '~/packages/articles/articles.js';

import { type TagType } from '../types/types.js';

const getArticleTags = (article: ArticleWithRelationsType): TagType[] => {
  const result: TagType[] = [];
  const { prompt, genre } = article;

  if (genre) {
    result.push({
      category: 'genre',
      text: genre,
    });
  }
  // eslint-disable-next-line unicorn/no-array-reduce
  return Object.entries(prompt ?? {}).reduce((resultingTags, [key, value]) => {
    if (value) {
      // eslint-disable-next-line unicorn/prefer-spread
      return resultingTags.concat({
        category: key as TagType['category'],
        text: value,
      });
    }
    return resultingTags;
  }, result);
};

export { getArticleTags };

import { type Tag } from '~/libs/types/types.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';

const getArticleTags = (article: ArticleResponseDto): Tag[] => {
  const results: Tag[] = [];
  const { prompt, genre } = article;

  if (genre) {
    results.push({
      category: 'genre',
      text: genre,
    });
  }

  return Object.entries(prompt ?? {}).reduce((resultingTags, [key, value]) => {
    if (value) {
      // eslint-disable-next-line unicorn/prefer-spread
      return resultingTags.concat({
        category: key as Tag['category'],
        text: value,
      });
    }
    return resultingTags;
  }, results);
};

export { getArticleTags };

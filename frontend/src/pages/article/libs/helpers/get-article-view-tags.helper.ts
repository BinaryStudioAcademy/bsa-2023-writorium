import { getArticleTags } from '~/libs/helpers/helpers.js';
import { type Tag } from '~/libs/types/types.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';
import { PromptCategory } from '~/packages/prompts/prompts.js';

const getArticleViewTags = (article: ArticleResponseDto): Tag[] | null => {
  const tags = getArticleTags(article);
  if (tags.length) {
    return tags.filter((tag) => tag.category !== PromptCategory.GENRE);
  }
  return null;
};

export { getArticleViewTags };

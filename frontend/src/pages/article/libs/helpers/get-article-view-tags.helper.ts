import { getArticleTags } from '~/libs/helpers/helpers.js';
import { type TagType } from '~/libs/types/types.js';
import { type ArticleResponseDto } from '~/packages/articles/articles.js';
import { PromptCategory } from '~/packages/prompts/libs/enums/enums.js';

const getArticleViewTags = (article: ArticleResponseDto): TagType[] | null => {
  const tags = getArticleTags(article);
  if (tags.length) {
    return tags.filter((tag) => tag.category !== PromptCategory.GENRE);
  }
  return null;
};

export { getArticleViewTags };

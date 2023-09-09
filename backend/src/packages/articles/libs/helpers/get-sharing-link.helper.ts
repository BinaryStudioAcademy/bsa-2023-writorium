import { ApiPath } from '~/libs/enums/enums.js';
import { token as articleToken } from '~/libs/packages/token/token.js';
import { ArticlesApiPath } from '~/packages/articles/libs/enums/enums.js';

const getSharingLink = async (id: number, origin: string): Promise<string> => {
  const token = await articleToken.createInfiniteToken({
    articleId: id,
  });

  return `${origin}${ApiPath.ARTICLES}${ArticlesApiPath.TOKEN}/${token}`;
};

export { getSharingLink };

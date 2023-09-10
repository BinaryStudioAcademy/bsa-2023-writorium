import { ApiPath } from '~/libs/enums/enums.js';
import { token as articleToken } from '~/libs/packages/token/token.js';

import { SHARED_$TOKEN } from '../constants/constants.js';

const getSharingLink = async (id: number, origin: string): Promise<string> => {
  const token = await articleToken.createInfiniteToken({
    articleId: id,
  });
  return `${origin}${ApiPath.ARTICLES}${SHARED_$TOKEN.replace(
    ':token',
    token,
  )}`;
};

export { getSharingLink };

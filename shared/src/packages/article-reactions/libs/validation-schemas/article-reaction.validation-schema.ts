import joi from 'joi';

import { ArticleReactionValidationMessage } from '../enums/enums.js';
import { type ArticleReactionRequestDto } from '../types/types.js';

const articleReaction = joi.object<ArticleReactionRequestDto, true>({
  isLike: joi.bool().required(),
  articleId: joi.number().integer().positive().required().messages({
    'string.empty':
      ArticleReactionValidationMessage.ARTICLE_REACTION_ARTICLE_ID_REQUIRE,
  }),
});

export { articleReaction };

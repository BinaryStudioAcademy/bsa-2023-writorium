import { config } from '~/libs/packages/config/config.js';
import { encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { articleService } from '~/packages/articles/articles.js';
import { followService } from '~/packages/follow/follow.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService({
  config,
  encrypt,
  userRepository,
  articleService,
});
const userController = new UserController(logger, userService, followService);

export { userController, userService };
export {
  type UserAuthResponseDto,
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
} from './libs/types/types.js';
export {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { UserModel } from './user.model.js';
export { type UserRepository } from './user.repository.js';
export { type UserService } from './user.service.js';
export { type UserDetailsModel } from './user-details.model.js';
export { userRepository };

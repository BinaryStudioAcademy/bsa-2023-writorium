import { ENCRYPTION } from '~/libs/packages/config/config.js';
import { encrypt } from '~/libs/packages/encryption/encrypt.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';

const userRepository = new UserRepository(UserModel);
const userService = new UserService(ENCRYPTION, encrypt, userRepository);
const userController = new UserController(logger, userService);

export { userController, userService };
export {
  type UserSignInRequestDto,
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';

export {
  userSignInValidationSchema,
  userSignUpValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { UserModel } from './user.model.js';

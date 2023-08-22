import { logger } from '~/libs/packages/logger/logger.js';

import { UserController } from './user.controller.js';
import { UserModel } from './user.model.js';
import { UserRepository } from './user.repository.js';
import { UserService } from './user.service.js';
import { UserDetailsModel } from './user-details.model.js';
import { UserDetailsRepository } from './user-details.repository.js';

const userRepository = new UserRepository(UserModel);
const userDetailsRepository = new UserDetailsRepository(UserDetailsModel);
const userService = new UserService({ userRepository, userDetailsRepository });
const userController = new UserController(logger, userService);

export { userController, userService };
export {
  type UserSignUpRequestDto,
  type UserSignUpResponseDto,
} from './libs/types/types.js';
export { userSignUpValidationSchema } from './libs/validation-schemas/validation-schemas.js';
export { UserModel } from './user.model.js';
export { UserDetailsModel } from './user-details.model.js';

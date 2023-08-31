import { encrypt } from '~/libs/packages/encrypt/encrypt.js';
import { logger } from '~/libs/packages/logger/logger.js';
import { mailer } from '~/libs/packages/mailer/mailer.js';
import { userService } from '~/packages/users/users.js';

import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';

const authService = new AuthService(userService, encrypt, mailer);
const authController = new AuthController(logger, authService);

export { authController, authService };
export { type AuthRequestPasswordDto } from './libs/types/types.js';

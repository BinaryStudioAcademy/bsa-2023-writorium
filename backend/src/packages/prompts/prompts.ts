import { logger } from '~/libs/packages/logger/logger.js';
import { openAIService } from '~/libs/packages/openai/openai.js';

import { PromptsController } from './prompt.controller.js';
import { PromptService } from './prompt.service.js';

const promptService = new PromptService(openAIService);
const promptController = new PromptsController(logger, promptService);

export { promptController, promptService };

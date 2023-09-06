import { logger } from '~/libs/packages/logger/logger.js';
import { openAIService } from '~/libs/packages/openai/openai.js';

import { genreRepository } from '../genres/genre.js';
import { PromptsController } from './prompt.controller.js';
import { PromptModel } from './prompt.model.js';
import { PromptRepository } from './prompt.repository.js';
import { PromptService } from './prompt.service.js';

const promptRepository = new PromptRepository(PromptModel);
const promptService = new PromptService(
  promptRepository,
  openAIService,
  genreRepository,
);
const promptController = new PromptsController(logger, promptService);

export { promptController, promptService };
export { PromptModel } from './prompt.model.js';

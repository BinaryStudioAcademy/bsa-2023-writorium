import { config } from '../config/config.js';
import { OpenAIService } from './openai.package.js';

const openAIService = new OpenAIService(config);

export { openAIService };

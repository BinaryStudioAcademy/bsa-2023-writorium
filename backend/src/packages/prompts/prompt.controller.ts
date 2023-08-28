import { ApiPath } from '~/libs/enums/enums.js';
import { type ApiHandlerResponse } from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.package.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { PromptsApiPath } from './libs/enums/enums.js';
import { type PromptService } from './prompt.service.js';

class PromptsController extends Controller {
  private promptService: PromptService;

  public constructor(logger: ILogger, promptService: PromptService) {
    super(logger, ApiPath.PROMPTS);

    this.promptService = promptService;

    this.addRoute({
      path: PromptsApiPath.GENERATE,
      method: 'GET',
      handler: () => this.generate(),
    });
  }

  public async generate(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.promptService.generate(),
    };
  }
}

export { PromptsController };

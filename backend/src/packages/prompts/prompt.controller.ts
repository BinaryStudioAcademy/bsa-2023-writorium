import { ApiPath } from '~/libs/enums/enums.js';
import { type ApiHandlerResponse } from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.package.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { PromptsApiPath } from './libs/enums/enums.js';
import { type PromptService } from './prompt.service.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      GeneratedArticlePrompt:
 *        type: object
 *        properties:
 *          genre:
 *            type: string
 *          setting:
 *            type: string
 *          character:
 *            type: string
 *          prop:
 *            type: string
 *          situation:
 *            type: string
 */
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

  /**
   * @swagger
   * /prompts/generate:
   *    get:
   *      summary: Generate random prompt for an article
   *      description: Generate random prompt for an article
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/GeneratedArticlePrompt'
   */
  public async generate(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.promptService.generate(),
    };
  }
}

export { PromptsController };

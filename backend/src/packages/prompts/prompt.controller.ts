import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { PromptsApiPath } from './libs/enums/enums.js';
import { type PromptRequestDto } from './libs/types/types.js';
import { promptCreateValidationSchema } from './libs/validation-schemas/validation-schemas.js';
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
 *      Prompt:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            readOnly: true
 *          character:
 *            type: string
 *          setting:
 *            type: string
 *          situation:
 *            type: string
 *          prop:
 *            type: string
 *          type:
 *            type: string
              enum:
                - daily
                - manual
            genreId:
 *            type: integer
 *            format: int64
 *            minimum: 1
 *            readOnly: true
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
    this.addRoute({
      path: PromptsApiPath.ROOT,
      method: 'POST',
      validation: {
        body: promptCreateValidationSchema,
      },
      handler: (options) =>
        this.create(
          options as ApiHandlerOptions<{
            body: PromptRequestDto;
          }>,
        ),
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

  /**
   * @swagger
   * /prompts:
   *    post:
   *      summary: Create a new prompt
   *      description: Create a new prompt
   *      requestBody:
   *        required: true
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#components/schemas/PromptRequestDto'
   *      responses:
   *        201:
   *          description: Prompt created successfully
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Prompt'
   */

  private async create(
    options: ApiHandlerOptions<{
      body: PromptRequestDto;
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.CREATED,
      payload: await this.promptService.create(options.body),
    };
  }
}

export { PromptsController };

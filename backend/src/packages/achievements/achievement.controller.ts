import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type AchievementService } from '~/packages/achievements/achievement.service.js';

import { AchievementsApiPath } from './libs/enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Achievement:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *            minimum: 1
 *          key:
 *            type: string
 *          name:
 *            type: string
 *          description:
 *            type: string
 */

class AchievementController extends Controller {
  private achievementService: AchievementService;

  public constructor(logger: ILogger, achievementService: AchievementService) {
    super(logger, ApiPath.ACHIEVEMENTS);

    this.achievementService = achievementService;

    this.addRoute({
      path: AchievementsApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });

    this.addRoute({
      path: AchievementsApiPath.$ID,
      method: 'GET',
      handler: (options) => {
        return this.find(
          options as ApiHandlerOptions<{
            params: { id: number };
          }>,
        );
      },
    });
  }

  /**
   * @swagger
   * /achievements:
   *    get:
   *      description: Returns an array of achievements
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Achievement'
   */

  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.achievementService.findAll(),
    };
  }

  /**
   * @swagger
   * /achievements/{id}:
   *    get:
   *      description: Returns an achievement by ID
   *      parameters:
   *        - in: path
   *          name: id
   *          required: true
   *          schema:
   *            type: number
   *            format: number
   *            minimum: 1
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                $ref: '#/components/schemas/Achievement'
   */

  private async find(
    options: ApiHandlerOptions<{
      params: { id: number };
    }>,
  ): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.achievementService.find(options.params.id),
    };
  }
}

export { AchievementController };

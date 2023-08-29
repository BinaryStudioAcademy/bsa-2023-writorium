import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerResponse,
  Controller,
} from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type GenreService } from './genre.service.js';
import { GenresApiPath } from './lib/enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      Genre:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *          name:
 *            type: string
 *          key:
 *            type: string
 */
class GenreController extends Controller {
  private genreService: GenreService;

  public constructor(logger: ILogger, genreService: GenreService) {
    super(logger, ApiPath.GENRES);

    this.genreService = genreService;

    this.addRoute({
      path: GenresApiPath.ROOT,
      method: 'GET',
      handler: () => this.findAll(),
    });
  }

  /**
   * @swagger
   * /users:
   *    get:
   *      description: Returns an array of genres
   *      responses:
   *        200:
   *          description: Successful operation
   *          content:
   *            application/json:
   *              schema:
   *                type: array
   *                items:
   *                  $ref: '#/components/schemas/Genre'
   */
  private async findAll(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.genreService.findAll(),
    };
  }
}

export { GenreController };

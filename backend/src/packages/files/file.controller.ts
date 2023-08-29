import { ApiPath } from '~/libs/enums/enums.js';
import {
  type ApiHandlerOptions,
  type ApiHandlerResponse,
} from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';
import { type FileToUpload } from '~/libs/plugins/file-upload/libs/types/types.js';

import { type FileService } from './file.service.js';
import { FilesApiPath } from './libs/enums/enums.js';

/**
 * @swagger
 * components:
 *    schemas:
 *      File:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: number
 *          url:
 *            type: string
 *            format: string
 */
class FileController extends Controller {
  private fileService: FileService;

  public constructor(logger: ILogger, fileService: FileService) {
    super(logger, ApiPath.FILES);

    this.fileService = fileService;

    this.addRoute({
      path: FilesApiPath.ROOT,
      method: 'POST',
      handler: (options) =>
        this.upload(
          options as ApiHandlerOptions<{
            fileToUpload: FileToUpload;
          }>,
        ),
    });
  }

  /**
   * @swagger
   * /files:
   *    post:
   *      summary: Upload a file
   *      description: Uploads a file to S3 bucket
   *      requestBody:
   *        required: true
   *        content:
   *          multipart/form-data:
   *            schema:
   *              required: ['file']
   *              type: object
   *              properties:
   *                file:
   *                  type: string
   *                  format: binary
   *      responses:
   *       '200':
   *         description: Successful operation
   *         content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/File'
   */
  private async upload({
    fileToUpload,
  }: ApiHandlerOptions<{
    fileToUpload: FileToUpload;
  }>): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.fileService.upload(
        fileToUpload.buffer,
        fileToUpload.extension,
      ),
    };
  }
}

export { FileController };

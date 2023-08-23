import { ApiPath } from '~/libs/enums/enums.js';
import { type ApiHandlerResponse } from '~/libs/packages/controller/controller.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { HttpCode } from '~/libs/packages/http/http.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type FileService } from './file.service.js';
import { FilesApiPath } from './libs/enums/enums.js';

class FileController extends Controller {
  private fileService: FileService;

  public constructor(logger: ILogger, fileService: FileService) {
    super(logger, ApiPath.FILES);

    this.fileService = fileService;

    this.addRoute({
      path: FilesApiPath.ROOT,
      method: 'PUT',
      handler: () => this.upload(),
    });
  }

  // @todo: add resposes to swagger doc

  /**
   * @swagger
   * /files:
   *    put:
   *      description: Uploads a file
   *      parameters:
   *       - in: path
   *         name: objectName
   *         required: true
   *         description: The name of file to upload.
   *         schema:
   *           type: string
   */
  private async upload(): Promise<ApiHandlerResponse> {
    return {
      status: HttpCode.OK,
      payload: await this.fileService.upload(),
    };
  }
}

export { FileController };

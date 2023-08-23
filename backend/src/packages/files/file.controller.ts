import { ApiPath } from '~/libs/enums/enums.js';
import { Controller } from '~/libs/packages/controller/controller.js';
import { type ILogger } from '~/libs/packages/logger/logger.js';

import { type FileService } from './file.service.js';

class FileController extends Controller {
  private fileService: FileService;

  public constructor(logger: ILogger, fileService: FileService) {
    super(logger, ApiPath.FILES);

    this.fileService = fileService;
  }
}

export { FileController };

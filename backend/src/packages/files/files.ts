import { logger } from '~/libs/packages/logger/logger.js';

import { FileController } from './file.controller.js';
import { FileModel } from './file.model.js';
import { FileRepository } from './file.repository.js';
import { FileService } from './file.service.js';
import { FileUploadClient } from './file-upload-client.js';

const fileUploadClient = new FileUploadClient();
const fileRepository = new FileRepository(FileModel);
const fileService = new FileService(fileRepository, fileUploadClient);
const fileController = new FileController(logger, fileService);

export { fileController, fileService };

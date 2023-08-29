import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import {
  FileNotProvidedError,
  FileSizeLimitExceededError,
  UnsupportedFileTypeError,
} from '~/libs/packages/exceptions/exceptions.js';
import { type FileType } from '~/libs/packages/file/file.package.js';
import { getFileExtensionFromFileName } from '~/libs/packages/file/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';

import { FileUploadDecoratedProperty } from './libs/enums/enums.js';

type FileUploadPluginOptions = {
  supportedFileTypes?: ValueOf<typeof FileType>[];
};

const fileUploadPlugin = fp(
  (fastify, options: FileUploadPluginOptions, done) => {
    fastify.decorateRequest(FileUploadDecoratedProperty.FILE_TO_UPLOAD, null);

    fastify.addHook(
      'preValidation',
      async (request: FastifyRequest<{ Body: { file?: MultipartFile } }>) => {
        if (!request.isMultipart()) {
          return;
        }

        const { supportedFileTypes } =
          options ?? ({} as FileUploadPluginOptions);

        const data = request.body.file;

        if (!data || !data.fieldname || !data.filename) {
          throw new FileNotProvidedError();
        }

        if (
          supportedFileTypes?.length &&
          !supportedFileTypes.includes(
            data.mimetype as ValueOf<typeof FileType>,
          )
        ) {
          throw new UnsupportedFileTypeError();
        }

        if (data.file.truncated) {
          throw new FileSizeLimitExceededError();
        }

        const fileBuffer = await data.toBuffer();

        request.fileToUpload = {
          buffer: fileBuffer,
          extension: getFileExtensionFromFileName(data.filename),
        };
      },
    );

    done();
  },
);

export { fileUploadPlugin };

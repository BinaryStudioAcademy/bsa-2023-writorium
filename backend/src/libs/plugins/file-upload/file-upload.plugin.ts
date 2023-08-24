import { type MultipartFile } from '@fastify/multipart';
import { type FastifyRequest } from 'fastify';
import fp from 'fastify-plugin';

import {
  FileNotProvidedError,
  FileSizeLimitExceededError,
  UnsupportedFileTypeError,
} from '~/libs/packages/exceptions/exceptions.js';
import { type FileType } from '~/libs/packages/file/file.package.js';
import { type ValueOf } from '~/libs/types/types.js';

// @todo: move to index.d.ts
declare module 'fastify' {
  interface FastifyRequest {
    fileBuffer: Buffer | null;
  }
}

type FileUploadPluginOptions = {
  supportedFileTypes?: ValueOf<typeof FileType>[];
};

const fileUploadPlugin = fp(
  (fastify, options: FileUploadPluginOptions, done) => {
    fastify.decorateRequest('fileBuffer', null);

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

        request.fileBuffer = fileBuffer;
      },
    );

    done();
  },
);

export { fileUploadPlugin };

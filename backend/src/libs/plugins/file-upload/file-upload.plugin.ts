import fp from 'fastify-plugin';

import {
  FileNotProvidedError,
  FileSizeLimitExceededError,
  UnsupportedFileTypeError,
} from '~/libs/packages/exceptions/exceptions.js';
import { type FileType } from '~/libs/packages/file/file.package.js';
import { mbToBytes } from '~/libs/packages/file/file.package.js';
import { type ValueOf } from '~/libs/types/types.js';

// @todo: move to index.d.ts
declare module 'fastify' {
  interface FastifyRequest {
    fileBuffer: Buffer | null;
  }
}

type FileUploadPluginOptions = {
  fileSizeLimit?: number;
  supportedFileTypes?: ValueOf<typeof FileType>[];
};

const fileUploadPlugin = fp(
  (fastify, options: FileUploadPluginOptions, done) => {
    fastify.decorateRequest('fileBuffer', null);

    fastify.addHook('preValidation', async (request) => {
      if (!request.isMultipart()) {
        return;
      }

      const { supportedFileTypes, fileSizeLimit } =
        options ?? ({} as FileUploadPluginOptions);

      const data = await request.file({
        limits: { fileSize: fileSizeLimit && mbToBytes(fileSizeLimit) },
      });

      if (!data || !data.fieldname || !data.filename) {
        throw new FileNotProvidedError();
      }

      if (
        supportedFileTypes?.length &&
        !supportedFileTypes.includes(data.mimetype as ValueOf<typeof FileType>)
      ) {
        throw new UnsupportedFileTypeError();
      }

      try {
        request.fileBuffer = await data.toBuffer();
      } catch {
        throw new FileSizeLimitExceededError({ limit: fileSizeLimit });
      }
    });

    done();
  },
);

export { fileUploadPlugin };

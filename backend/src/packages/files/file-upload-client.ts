import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { type IFileUploadClient } from '~/libs/packages/file/file.package.js';

class FileUploadClient implements IFileUploadClient {
  private s3Client: S3Client;

  public constructor() {
    this.s3Client = new S3Client({});
  }

  public async upload(fileBuffer: Buffer): Promise<{ url: string }> {
    const command = new PutObjectCommand({
      Bucket: 'test-bucket',
      Key: 'hello-s3.txt',
      Body: fileBuffer,
    });

    await this.s3Client.send(command);

    return { url: '' };
  }
}

export { FileUploadClient };

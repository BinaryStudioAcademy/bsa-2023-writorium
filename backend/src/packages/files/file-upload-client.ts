import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { type IConfig } from '~/libs/packages/config/config.js';
import { type IFileUploadClient } from '~/libs/packages/file/file.package.js';

class FileUploadClient implements IFileUploadClient {
  private config: IConfig;
  private s3Client: S3Client;

  public constructor(config: IConfig) {
    this.config = config;

    const { AWS } = this.config.ENV;

    this.s3Client = new S3Client({
      region: AWS.AWS_REGION,
      credentials: {
        secretAccessKey: AWS.AWS_SECRET_ACCESS_KEY,
        accessKeyId: AWS.AWS_ACCESS_KEY,
      },
    });
  }

  public async upload(fileBuffer: Buffer): Promise<{ url: string }> {
    const { AWS } = this.config.ENV;

    const fileName = crypto.randomUUID();

    const command = new PutObjectCommand({
      Bucket: AWS.AWS_BUCKET_NAME,
      Key: fileName,
      Body: fileBuffer,
    });

    await this.s3Client.send(command);

    return { url: '' };
  }
}

export { FileUploadClient };

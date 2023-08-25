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

  public getFileUrl(key: string): string {
    const { AWS } = this.config.ENV;

    return `https://${AWS.AWS_BUCKET_NAME}.s3.${AWS.AWS_REGION}.amazonaws.com/${key}`;
  }

  private generateFileKey(extension: string): string {
    return 'file_' + Date.now().toString() + extension;
  }

  public async upload(fileBuffer: Buffer, extension: string): Promise<string> {
    const { AWS } = this.config.ENV;

    const fileKey = this.generateFileKey(extension);

    const putObjectCommand = new PutObjectCommand({
      Bucket: AWS.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: fileBuffer,
    });

    await this.s3Client.send(putObjectCommand);

    return this.getFileUrl(fileKey);
  }
}

export { FileUploadClient };

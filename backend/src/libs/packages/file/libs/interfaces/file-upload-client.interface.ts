interface IFileUploadClient {
  upload(fileBuffer: Buffer, extension: string): Promise<string>;
}

export { type IFileUploadClient };

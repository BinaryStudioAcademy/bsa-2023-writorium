interface IFileUploadClient {
  upload(fileBuffer: Buffer): Promise<string>;
}

export { type IFileUploadClient };

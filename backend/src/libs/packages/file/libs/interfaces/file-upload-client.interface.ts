interface IFileUploadClient {
  upload(fileBuffer: Buffer): Promise<{ url: string }>;
}

export { type IFileUploadClient };

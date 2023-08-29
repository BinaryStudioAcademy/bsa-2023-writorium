import path from 'node:path';

const getFileExtensionFromFileName = (fileName: string): string =>
  path.extname(fileName);

export { getFileExtensionFromFileName };

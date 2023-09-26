import path from 'node:path';

const getFileExtensionFromFileName = (fileName: string): string => {
  return path.extname(fileName);
};

export { getFileExtensionFromFileName };

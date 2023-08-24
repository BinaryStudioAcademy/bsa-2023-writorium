import { type ValueOf } from 'shared/build/index.js';

import { FileType } from '../enums/enums.js';

const SUPPORTED_FILE_TYPES: ValueOf<typeof FileType>[] = [
  FileType.JPEG,
  FileType.PNG,
  FileType.SVG,
  FileType.WEBP,
  FileType.BMP,
];

const MAX_FILE_SIZE_MB = 10;

export { MAX_FILE_SIZE_MB, SUPPORTED_FILE_TYPES };

import { type ValueOf } from 'shared/build/index.js';

import { MimeType } from '../enums/enums.js';

const SUPPORTED_MIME_TYPES: ValueOf<typeof MimeType>[] = [
  MimeType.JPEG,
  MimeType.PNG,
  MimeType.SVG,
  MimeType.WEBP,
  MimeType.BMP,
];

const MAX_FILE_SIZE_MB = 10;

export { MAX_FILE_SIZE_MB, SUPPORTED_MIME_TYPES };

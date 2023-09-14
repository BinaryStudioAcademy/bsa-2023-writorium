import { config } from '~/libs/packages/config/config.js';
import { http } from '~/libs/packages/http/http.js';
import { storage } from '~/libs/packages/storage/storage.js';

import { GenresApi } from './genres-api.package.js';

const genresApi = new GenresApi({
  baseUrl: config.ENV.API.ORIGIN_URL,
  storage,
  http,
});

export { genresApi };
export {
  type GenreGetAllItemResponseDto,
  type GenreGetAllResponseDto,
} from './libs/types/types.js';

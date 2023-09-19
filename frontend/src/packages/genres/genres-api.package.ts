import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { GenresApiPath } from './libs/enums/enums.js';
import { type GenreGetAllResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class GenresApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.GENRES, baseUrl, http, storage });
  }

  public async getAll(): Promise<GenreGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(GenresApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<GenreGetAllResponseDto>();
  }
}

export { GenresApi };

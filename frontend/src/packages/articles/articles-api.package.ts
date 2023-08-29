import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { ArticlesApiPath } from './libs/enums/enums.js';
import {
  type ArticleBaseResponseDto,
  type ArticleCreateDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};
class ArticleApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.ARTICLES, baseUrl, http, storage });
  }

  public async create(
    payload: ArticleCreateDto,
  ): Promise<ArticleBaseResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<ArticleBaseResponseDto>();
  }
}

export { ArticleApi };

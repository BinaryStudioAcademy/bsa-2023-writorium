import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { ArticlesApiPath } from './libs/enums/enums.js';
import {
  type ArticleBaseResponseDto,
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
  type ArticleUpdateRequestPayload,
  type ArticleWithAuthorType,
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

  public async getAll(): Promise<ArticleGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.ROOT, {}),
      { method: 'GET', contentType: ContentType.JSON, hasAuth: true },
    );

    return await response.json<ArticleGetAllResponseDto>();
  }

  public async getOwn(): Promise<ArticleGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.OWN, {}),
      { method: 'GET', contentType: ContentType.JSON, hasAuth: true },
    );

    return await response.json<ArticleGetAllResponseDto>();
  }

  public async create(
    payload: ArticleRequestDto,
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
  public async update(
    payload: ArticleUpdateRequestPayload,
  ): Promise<ArticleWithAuthorType> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.EDIT, {
        id: payload.articleId.toString(),
      }),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload.articleForUpdate),
        hasAuth: true,
      },
    );

    return await response.json<ArticleBaseResponseDto>();
  }
}

export { ArticleApi };

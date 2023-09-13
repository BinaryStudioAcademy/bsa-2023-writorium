import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { ArticlesApiPath } from './libs/enums/enums.js';
import {
  type ArticleGetAllResponseDto,
  type ArticleReactionRequestDto,
  type ArticleReactionResponseDto,
  type ArticleRequestDto,
  type ArticleResponseDto,
  type ArticlesFilters,
  type ArticleUpdateRequestPayload,
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

  public async getAll(
    filters: ArticlesFilters,
  ): Promise<ArticleGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
        query: filters,
      },
    );

    return await response.json<ArticleGetAllResponseDto>();
  }

  public async getOwn(
    filters: ArticlesFilters,
  ): Promise<ArticleGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.OWN, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
        query: filters,
      },
    );

    return await response.json<ArticleGetAllResponseDto>();
  }

  public async create(payload: ArticleRequestDto): Promise<ArticleResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<ArticleResponseDto>();
  }
  public async update(
    payload: ArticleUpdateRequestPayload,
  ): Promise<ArticleResponseDto> {
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

    return await response.json<ArticleResponseDto>();
  }

  public async getArticle(id: number): Promise<ArticleResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.$ID, { id: String(id) }),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<ArticleResponseDto>();
  }

  public async updateArticleReaction(
    payload: ArticleReactionRequestDto,
  ): Promise<ArticleReactionResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.REACT, {}),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<ArticleReactionResponseDto>();
  }

  public async delete(id: number): Promise<ArticleResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.$ID, { id: String(id) }),
      {
        method: 'DELETE',
        contentType: ContentType.JSON,
        payload: JSON.stringify(id),
        hasAuth: true,
      },
    );

    return await response.json<ArticleResponseDto>();
  }
}

export { ArticleApi };

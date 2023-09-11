import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { writeTextInClipboard } from '~/libs/helpers/helpers.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { ArticlesApiPath } from './libs/enums/enums.js';
import {
  type ArticleBaseResponseDto,
  type ArticleGetAllResponseDto,
  type ArticleRequestDto,
  type ArticlesFilters,
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

  public async share(id: string): Promise<{ link: string }> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.$ID_SHARE, { id }),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    const { link } = await response.json<{ link: string }>();

    await writeTextInClipboard(link);

    return { link };
  }

  public async getByToken(token: string): Promise<ArticleBaseResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.SHARED_BASE, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: false,
        sharedArticleToken: token,
      },
    );

    return await response.json<ArticleBaseResponseDto>();
  }

  public async getArticle(id: number): Promise<ArticleWithAuthorType> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.$ID, { id: String(id) }),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<ArticleWithAuthorType>();
  }
}

export { ArticleApi };

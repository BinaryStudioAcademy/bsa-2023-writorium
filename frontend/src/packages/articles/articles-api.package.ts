import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { writeTextInClipboard } from '~/libs/helpers/helpers.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { CustomHttpHeader, type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { ArticlesApiPath } from './libs/enums/enums.js';
import {
  type ArticleGetAllResponseDto,
  type ArticleGetImprovementSuggestionsResponseDto,
  type ArticleReactionRequestDto,
  type ArticleReactionResponseDto,
  type ArticleRequestDto,
  type ArticlesFilters,
  type ArticleUpdateRequestPayload,
  type ArticleWithCountsResponseDto,
  type ArticleWithFollowResponseDto,
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
  ): Promise<ArticleWithCountsResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<ArticleWithCountsResponseDto>();
  }

  public async update(
    payload: ArticleUpdateRequestPayload,
  ): Promise<ArticleWithCountsResponseDto> {
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

    return await response.json<ArticleWithCountsResponseDto>();
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

  public async getByToken(
    token: string,
  ): Promise<ArticleWithFollowResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.SHARED_BASE, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: false,
        customHeaders: {
          [CustomHttpHeader.SHARED_ARTICLE_TOKEN]: token,
        },
      },
    );

    return await response.json<ArticleWithFollowResponseDto>();
  }

  public async getArticle(id: number): Promise<ArticleWithFollowResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.$ID, { id: String(id) }),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<ArticleWithFollowResponseDto>();
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

  public async delete(id: number): Promise<ArticleWithCountsResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.$ID, { id: String(id) }),
      {
        method: 'DELETE',
        hasAuth: true,
      },
    );

    return await response.json<ArticleWithCountsResponseDto>();
  }

  public async toggleIsFavourite(
    articleId: number,
  ): Promise<ArticleWithCountsResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.FAVORITES, {
        id: String(articleId),
      }),
      {
        method: 'POST',
        hasAuth: true,
      },
    );

    return await response.json<ArticleWithCountsResponseDto>();
  }

  public async getImprovementSuggestions(
    id: number,
  ): Promise<ArticleGetImprovementSuggestionsResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(ArticlesApiPath.$ID_IMPROVEMENT_SUGGESTIONS, {
        id: String(id),
      }),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<ArticleGetImprovementSuggestionsResponseDto>();
  }
}

export { ArticleApi };

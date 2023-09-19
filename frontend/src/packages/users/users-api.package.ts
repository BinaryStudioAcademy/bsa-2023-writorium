import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { UsersApiPath } from './libs/enums/enums.js';
import {
  type UserActivityResponseDto,
  type UserArticlesGenreStatsResponseDto,
  type UserAuthResponseDto,
  type UserDetailsAuthorResponseDto,
  type UserFollowResponseDto,
  type UserGetAllResponseDto,
  type UserUpdateRequestDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class UserApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.USERS, baseUrl, http, storage });
  }

  public async getAll(): Promise<UserGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: false,
      },
    );

    return await response.json<UserGetAllResponseDto>();
  }

  public async getUserActivity(): Promise<UserActivityResponseDto[]> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.ACTIVITY, {}),
      { method: 'GET', contentType: ContentType.JSON, hasAuth: true },
    );

    return await response.json<UserActivityResponseDto[]>();
  }

  public async getUserArticlesGenresStats(): Promise<UserArticlesGenreStatsResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.ARTICLES_GENRE_STATS, {}),
      { method: 'GET', contentType: ContentType.JSON, hasAuth: true },
    );

    return await response.json<UserArticlesGenreStatsResponseDto>();
  }

  public async updateUser(
    payload: UserUpdateRequestDto,
  ): Promise<UserAuthResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.ROOT, {}),
      {
        method: 'PUT',
        contentType: ContentType.JSON,
        hasAuth: true,
        payload: JSON.stringify(payload),
      },
    );

    return await response.json<UserAuthResponseDto>();
  }

  public async getAllAuthors(): Promise<UserDetailsAuthorResponseDto[]> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.AUTHORS, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<UserDetailsAuthorResponseDto[]>();
  }

  public async toggleFollowAuthor(
    authorId: number,
  ): Promise<UserFollowResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.FOLLOW, { id: authorId.toString() }),
      {
        method: 'POST',
        hasAuth: true,
      },
    );

    return await response.json<UserFollowResponseDto>();
  }

  public async getAuthorFollowersCountAndStatus(
    authorId: number,
  ): Promise<UserFollowResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(UsersApiPath.FOLLOW, { id: authorId.toString() }),
      {
        method: 'GET',
        hasAuth: true,
      },
    );

    return await response.json<UserFollowResponseDto>();
  }
}

export { UserApi };

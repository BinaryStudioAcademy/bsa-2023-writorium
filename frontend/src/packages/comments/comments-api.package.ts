import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { CommentsApiPath } from './libs/enums/enums.js';
import {
  type CommentBaseRequestDto,
  type CommentGetAllResponseDto,
  type CommentUpdateDto,
  type CommentWithRelationsResponseDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class CommentsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.COMMENTS, baseUrl, http, storage });
  }

  public async fetchAllByArticleId(
    articleId: number,
  ): Promise<CommentGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(CommentsApiPath.ROOT, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
        query: { articleId },
      },
    );

    return await response.json<CommentGetAllResponseDto>();
  }

  public async create(
    payload: CommentBaseRequestDto,
  ): Promise<CommentWithRelationsResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(CommentsApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<CommentWithRelationsResponseDto>();
  }

  public async update({
    id,
    ...payload
  }: CommentUpdateDto): Promise<CommentWithRelationsResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(CommentsApiPath.$ID, {
        id: id.toString(),
      }),
      {
        method: 'PATCH',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<CommentWithRelationsResponseDto>();
  }
}

export { CommentsApi };

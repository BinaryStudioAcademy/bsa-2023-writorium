import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { PromptsApiPath } from './libs/enums/enums.js';
import {
  type GenerateArticlePromptResponseDto,
  type PromptBaseResponseDto,
  type PromptRequestDto,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class PromptApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.PROMPTS, baseUrl, http, storage });
  }

  public async generate(): Promise<GenerateArticlePromptResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(PromptsApiPath.GENERATE, {}),
      {
        method: 'GET',
        contentType: ContentType.JSON,
        hasAuth: true,
      },
    );

    return await response.json<GenerateArticlePromptResponseDto>();
  }

  public async create(
    payload: PromptRequestDto,
  ): Promise<PromptBaseResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(PromptsApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
        hasAuth: true,
      },
    );

    return await response.json<PromptBaseResponseDto>();
  }
}

export { PromptApi };

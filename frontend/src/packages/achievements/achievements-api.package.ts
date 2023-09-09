import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { AchievementsApiPath } from './libs/enums/enums.js';
import { type AchievementGetAllResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};

class AchievementsApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.ACHIEVEMENTS, baseUrl, http, storage });
  }

  public async fetchAll(): Promise<AchievementGetAllResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(AchievementsApiPath.ROOT, {}),
      { method: 'GET', contentType: ContentType.JSON, hasAuth: true },
    );

    return await response.json<AchievementGetAllResponseDto>();
  }
}

export { AchievementsApi };

import { ApiPath, ContentType } from '~/libs/enums/enums.js';
import { HttpApi } from '~/libs/packages/api/api.js';
import { type IHttp } from '~/libs/packages/http/http.js';
import { type IStorage } from '~/libs/packages/storage/storage.js';

import { FilesApiPath } from './libs/enums/enums.js';
import { type FileUploadResponseDto } from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  http: IHttp;
  storage: IStorage;
};
class FileApi extends HttpApi {
  public constructor({ baseUrl, http, storage }: Constructor) {
    super({ path: ApiPath.FILES, baseUrl, http, storage });
  }

  public async uploadFile(payload: FormData): Promise<FileUploadResponseDto> {
    const response = await this.load(
      this.getFullEndpoint(FilesApiPath.ROOT, {}),
      {
        method: 'POST',
        contentType: ContentType.FORM_DATA,
        payload,
        hasAuth: true,
      },
    );

    return await response.json<FileUploadResponseDto>();
  }
}

export { FileApi };

import {
  AppRoute,
  ContentType,
  ExceptionMessage,
  ServerErrorType,
} from '~/libs/enums/enums.js';
import { configureString, constructUrl } from '~/libs/helpers/helpers.js';
import {
  CustomHttpHeader,
  HttpCode,
  HttpError,
  HttpHeader,
  type IHttp,
} from '~/libs/packages/http/http.js';
import { type IStorage, StorageKey } from '~/libs/packages/storage/storage.js';
import { type ServerErrorResponse, type ValueOf } from '~/libs/types/types.js';

import { type IHttpApi } from './libs/interfaces/interfaces.js';
import {
  type HttpApiOptions,
  type HttpApiResponse,
} from './libs/types/types.js';

type Constructor = {
  baseUrl: string;
  path: string;
  http: IHttp;
  storage: IStorage;
};

class HttpApi implements IHttpApi {
  private baseUrl: string;

  private path: string;

  private http: IHttp;

  private storage: IStorage;

  public constructor({ baseUrl, path, http, storage }: Constructor) {
    this.baseUrl = baseUrl;
    this.path = path;
    this.http = http;
    this.storage = storage;
  }

  private getUrl(path: string, query?: Record<string, unknown>): string {
    return constructUrl({ path, queryParams: query });
  }

  public async load(
    path: string,
    options: HttpApiOptions,
  ): Promise<HttpApiResponse> {
    const {
      method,
      contentType,
      payload = null,
      hasAuth,
      query,
      sharedArticleToken = null,
    } = options;

    const headers = await this.getHeaders(
      contentType,
      hasAuth,
      sharedArticleToken,
    );

    const response = await this.http.load(this.getUrl(path, query), {
      method,
      headers,
      payload,
    });

    return (await this.checkResponse(response)) as HttpApiResponse;
  }

  protected getFullEndpoint<T extends Record<string, string>>(
    ...parameters: [...string[], T]
  ): string {
    const copiedParameters = [...parameters];

    const options = copiedParameters.pop() as T;

    return configureString(
      this.baseUrl,
      this.path,
      ...(copiedParameters as string[]),
      options,
    );
  }

  private async getHeaders(
    contentType: ValueOf<typeof ContentType>,
    hasAuth: boolean,
    sharedArticleToken: string | null,
  ): Promise<Headers> {
    const headers = new Headers();

    if (contentType !== ContentType.FORM_DATA) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (sharedArticleToken) {
      headers.append(CustomHttpHeader.SHARED_ARTICLE_TOKEN, sharedArticleToken);
    }

    if (hasAuth) {
      const token = await this.storage.get<string>(StorageKey.TOKEN);

      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token ?? ''}`);
    }

    return headers;
  }

  private async checkResponse(response: Response): Promise<Response> {
    if (!response.ok) {
      await this.handleError(response);
    }

    return response;
  }

  private async handleError(response: Response): Promise<never> {
    const parsedException = (await response.json().catch(
      (): ServerErrorResponse => ({
        errorType: ServerErrorType.COMMON,
        message: response.statusText,
      }),
    )) as ServerErrorResponse;

    if (
      response.status === HttpCode.UNAUTHORIZED &&
      parsedException.message === ExceptionMessage.INVALID_TOKEN
    ) {
      await this.storage.drop(StorageKey.TOKEN);
      window.location.assign(AppRoute.SIGN_IN);
    }

    const isCustomException = Boolean(parsedException.errorType);

    throw new HttpError({
      status: response.status as ValueOf<typeof HttpCode>,
      errorType: isCustomException
        ? parsedException.errorType
        : ServerErrorType.COMMON,
      message: parsedException.message,
      details: 'details' in parsedException ? parsedException.details : [],
    });
  }
}

export { HttpApi };

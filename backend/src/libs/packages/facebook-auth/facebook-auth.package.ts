import { type IConfig } from '../config/config.js';
import { HttpCode, HttpError } from '../http/http.js';
import { type IFacebookAuth } from './libs/interfaces/interfaces.js';

type FacebookTokenValidationResponse = {
  data: {
    is_valid: boolean;
    [key: string]: unknown;
  };
};

class FacebookAuth implements IFacebookAuth {
  private appSecret: string;
  private appId: string;
  private baseUrl: string;

  public constructor(config: IConfig) {
    this.appSecret = config.ENV.FACEBOOK_AUTH.APP_SECRET;
    this.appId = config.ENV.FACEBOOK_AUTH.APP_ID;
    this.baseUrl = 'https://graph.facebook.com';
  }

  public async verifyFacebookAccessToken(
    accessToken: string,
  ): Promise<boolean> {
    try {
      const url = `/debug_token?input_token=${accessToken}&access_token=${this.appId}|${this.appSecret}`;
      const validationUrl = new URL(url, this.baseUrl);
      const response = await fetch(validationUrl);
      const responseData =
        (await response.json()) as FacebookTokenValidationResponse;

      return responseData.data.is_valid;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';

      throw new HttpError({
        message: errorMessage,
        status: HttpCode.INTERNAL_SERVER_ERROR,
      });
    }
  }
}

export { FacebookAuth };

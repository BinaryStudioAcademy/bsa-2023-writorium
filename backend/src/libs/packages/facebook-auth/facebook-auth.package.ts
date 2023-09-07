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

  public constructor(config: IConfig) {
    this.appSecret = config.ENV.FACEBOOK_AUTH.APP_SECRET;
    this.appId = config.ENV.FACEBOOK_AUTH.APP_ID;
  }

  public async verifyFacebookAccessToken(
    accessToken: string,
  ): Promise<boolean> {
    try {
      const validationUrl = `https://graph.facebook.com/debug_token?input_token=${accessToken}&access_token=${this.appId}|${this.appSecret}`;

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

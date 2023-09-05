import { type LoginTicket, type TokenPayload } from 'google-auth-library';
import { OAuth2Client } from 'google-auth-library';

import { type IConfig } from '../config/config.js';
import { HttpCode, HttpError } from '../http/http.js';
import { type GetTokenResponse } from './libs/types/types.js';

class GoogleAuthClient {
  private authClient: OAuth2Client;
  private config: IConfig;

  public constructor(config: IConfig) {
    this.config = config;
    const { GOOGLE_AUTH } = this.config.ENV;
    this.authClient = new OAuth2Client(
      GOOGLE_AUTH.GOOGLE_CLIENT_ID,
      GOOGLE_AUTH.GOOGLE_CLIENT_SECRET,
      'postmessage',
    );
  }
  private async getTokens(code: string): Promise<GetTokenResponse['tokens']> {
    try {
      const { tokens } = await this.authClient.getToken(code);
      return tokens;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new HttpError({
        message: errorMessage,
        status: HttpCode.INTERNAL_SERVER_ERROR,
      });
    }
  }

  private async verify(token: string): Promise<LoginTicket> {
    const { GOOGLE_AUTH } = this.config.ENV;
    return await this.authClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_AUTH.GOOGLE_CLIENT_ID,
    });
  }

  public async getUserInfo(code: string): Promise<TokenPayload | undefined> {
    const tokens = await this.getTokens(code);
    if (!tokens || !tokens.id_token) {
      throw new HttpError({
        message: 'Unable to decode user info!',
        status: HttpCode.BAD_REQUEST,
      });
    }
    const ticket = await this.verify(tokens.id_token);

    return ticket.getPayload();
  }
}

export { GoogleAuthClient };

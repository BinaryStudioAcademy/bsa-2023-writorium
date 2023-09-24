import { type LoginTicket, type TokenPayload } from 'google-auth-library';
import { OAuth2Client } from 'google-auth-library';

import { ExceptionMessage } from '~/libs/enums/enums.js';

import { type IConfig } from '../config/config.js';
import {
  BadRequestError,
  InternalServerError,
} from '../exceptions/exceptions.js';
import { POSTMESSAGE } from './libs/constants/constants.js';
import { type GetTokenResponse } from './libs/types/types.js';

class GoogleAuthClient {
  private authClient: OAuth2Client;
  private config: IConfig;

  public constructor(config: IConfig) {
    this.config = config;
    const { GOOGLE_AUTH } = this.config.ENV;
    this.authClient = new OAuth2Client(
      GOOGLE_AUTH.CLIENT_ID,
      GOOGLE_AUTH.CLIENT_SECRET,
      POSTMESSAGE,
    );
  }
  private async getTokens(code: string): Promise<GetTokenResponse['tokens']> {
    try {
      const { tokens } = await this.authClient.getToken(code);
      return tokens;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : ExceptionMessage.UNKNOWN_ERROR;
      throw new InternalServerError(errorMessage);
    }
  }

  private async verify(token: string): Promise<LoginTicket> {
    const { GOOGLE_AUTH } = this.config.ENV;
    return await this.authClient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_AUTH.CLIENT_ID,
    });
  }

  public async getUserInfo(code: string): Promise<TokenPayload | undefined> {
    const tokens = await this.getTokens(code);
    if (!tokens || !tokens.id_token) {
      throw new BadRequestError(ExceptionMessage.UNABLE_TO_DECODE_USER_INFO);
    }
    const ticket = await this.verify(tokens.id_token);

    return ticket.getPayload();
  }
}

export { GoogleAuthClient };

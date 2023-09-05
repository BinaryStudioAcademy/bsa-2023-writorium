import { type GaxiosResponse } from 'gaxios';
import { type Credentials } from 'google-auth-library';

interface GetTokenResponse {
  tokens: Credentials;
  res: GaxiosResponse | null;
}

export { type GetTokenResponse };

import { config } from '~/libs/packages/config/config.js';

import { GoogleAuthClient } from './google-auth-client.package.js';

const googleAuthClient = new GoogleAuthClient(config);

export { googleAuthClient };

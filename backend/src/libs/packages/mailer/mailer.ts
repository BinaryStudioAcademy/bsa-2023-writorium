import { config } from '~/libs/packages/config/config.js';

import { Mailer } from './mailer.package.js';

const mailer = new Mailer(config);

export { mailer };
export { type SendEmailResponse } from './libs/types/types.js';

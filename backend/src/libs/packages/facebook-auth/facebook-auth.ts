import { config } from '../config/config.js';
import { FacebookAuth } from './facebook-auth.package.js';

const facebookAuth = new FacebookAuth(config);

export { type IFacebookAuth } from './libs/interfaces/interfaces.js';
export { facebookAuth };

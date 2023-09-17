import { config } from '../config/config.js';
import { Token } from './token.package.js';

const token = new Token(config);

export { type IToken } from './libs/interfaces/interfaces.js';
export { token };

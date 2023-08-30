import { type JWTPayload } from 'jose';

interface IToken {
  create<T extends Record<string, unknown>>(payload: T): Promise<string>;
  verifyToken<T extends Record<string, unknown>>(
    token: string,
  ): Promise<JWTPayload & T>;
}
export { type IToken };

import { type JwtPayload } from 'jsonwebtoken';

interface ITokenPayload extends JwtPayload {
  id: number;
}

export { type ITokenPayload };

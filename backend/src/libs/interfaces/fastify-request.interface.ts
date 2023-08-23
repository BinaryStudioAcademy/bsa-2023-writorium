import { type FastifyRequest } from 'fastify';

interface IFastifyRequest extends FastifyRequest {
  user?: {
    id: number;
    email: string;
  } | null;
}

export { type IFastifyRequest };

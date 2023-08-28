import { type UserAuthResponseDto } from './packages/users/users.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserAuthResponseDto;
  }
}

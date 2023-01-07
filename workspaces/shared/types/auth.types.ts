import type { FastifyRequest } from 'fastify';

export interface RequestUser {
  email: string;
  id: number;
  name: string;
  role: string;
}

export interface RequestWithUser extends FastifyRequest {
  user: RequestUser;
}

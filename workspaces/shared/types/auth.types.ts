import type { FastifyRequest } from 'fastify';
import { Role } from '@prisma/client';

export interface RequestUser {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export interface RequestWithUser extends FastifyRequest {
  user: RequestUser;
}

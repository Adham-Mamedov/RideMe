import type { FastifyRequest } from 'fastify';
import { Role } from '@prisma/client';

export interface IUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  card: {
    number: string; // partially hidden
    expDate: string;
  };
}

export interface RequestUser {
  id: string;
  email: string;
  name: string;
  role: Role;
  card: IUser['card'];
}

export interface RequestWithUser extends FastifyRequest {
  user: RequestUser;
}

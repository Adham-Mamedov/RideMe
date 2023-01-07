import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import { RequestWithUser } from '@shared/types/auth.types';

export const User = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest() as RequestWithUser;
    return req.user;
  }
);

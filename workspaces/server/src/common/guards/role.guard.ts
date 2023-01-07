import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { Role } from '@prisma/client';
import { RequestWithUser } from '@shared/types/auth.types';
import { AuthGuard } from '@server/common/guards/auth.guard';

const RoleGuard = (role: Role): Type<CanActivate> => {
  class RoleGuardMixin extends AuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      const roles = {
        [Role.User]: 1,
        [Role.Admin]: 2,
        [Role.Owner]: 3,
      };

      return roles[user?.role] >= roles[role];
    }
  }

  return mixin(RoleGuardMixin);
};

export default RoleGuard;

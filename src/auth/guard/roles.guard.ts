import { CanActivate, ExecutionContext } from '@nestjs/common';

export class RoleGuard implements CanActivate {
  constructor(private readonly allowedRoles: string[]) {}

  canActivate(ctx: ExecutionContext): boolean {
    const { user } = ctx.switchToHttp().getRequest();

    if (!user || this.allowedRoles.includes(user.role)) {
      return false;
    }

    return true;
  }
}

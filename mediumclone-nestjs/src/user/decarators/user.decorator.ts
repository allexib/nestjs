import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequstInterface } from '@app/types/expressRequst.interface';

export const User = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<ExpressRequstInterface>();

  if (!request.user) {
    return null;
  }

  if (data) {
    return request.user[data];
  }

  return request.user;
});
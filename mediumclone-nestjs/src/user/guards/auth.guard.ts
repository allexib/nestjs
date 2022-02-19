import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ExpressRequstInterface } from '@app/types/expressRequst.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<ExpressRequstInterface>();

    if (request.user) {
      return true;
    }

    throw  new HttpException('Not authorized', HttpStatus.UNAUTHORIZED);
  }
}
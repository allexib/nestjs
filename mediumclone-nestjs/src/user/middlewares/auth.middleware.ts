import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { ExpressRequstInterface } from '@app/types/expressRequst.interface';
import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '@app/config';
import { UserService } from '@app/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {
  }

  async use(req: ExpressRequstInterface, res: Response, next: NextFunction) {
    /*console.log('auth middleware', req.headers);
    next();*/
    if (!req.headers.authorization) {
      req.user = null;
      next();
      return;
    }

    const token = req.headers.authorization.split(' ')[1];
   /* console.log('token', token);*/

    try {
      const decode = verify(token, JWT_SECRET);
      const user = await this.userService.findById(decode.id);
      req.user = user;
      /* console.log('decode', decode);*/
      next();
    } catch (err) {
      req.user = null;
      next();
    }
  }
}
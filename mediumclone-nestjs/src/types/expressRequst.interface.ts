import { Request } from 'express';
import { UserEntity } from '@app/user/user.entity';

export interface ExpressRequstInterface extends Request {
  user?: UserEntity
}
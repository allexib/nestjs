import { Body, Controller, Get, Post, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/login.dto';
import { Request } from 'express';
import { ExpressRequstInterface } from '@app/types/expressRequst.interface';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('users')
  @UsePipes(new ValidationPipe())
  async createUser(@Body('user')createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    /*console.log('createUserDto', createUserDto)*/
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user')loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    /*console.log('loginUserDto', loginUserDto)
    return 'login' as any;*/
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  async currentUser(@Req() request: ExpressRequstInterface): Promise<UserResponseInterface> {
    console.log(request.user)
    /*console.log('request', request);*/
    return this.userService.buildUserResponse(request.user)
  }
}
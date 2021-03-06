import { Body, Controller, Get, Post, Put, Req, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from '@app/user/user.service';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { LoginUserDto } from '@app/user/dto/login.dto';
import { User } from '@app/user/decarators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { AuthGuard } from '@app/user/guards/auth.guard';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';
import { BackendValidationPipe } from '@app/shared/pipes/backendValidation.pipe';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(@Body('user')createUserDto: CreateUserDto): Promise<UserResponseInterface> {
    /*console.log('createUserDto', createUserDto)*/
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  async login(@Body('user')loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
    /*console.log('loginUserDto', loginUserDto)
    return 'login' as any;*/
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(
    @User()user: UserEntity,
    /* @User('id') currentUserId: number,*/
  ): Promise<UserResponseInterface> {
    /*console.log('userId', currentUserId);*/
    return this.userService.buildUserResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async updateCurrentUser(
    @User('id')currentUserId: number,
    @Body('user') updateUserDto: UpdateUserDto,
  ): Promise<UserResponseInterface> {
  const user=await this.userService.updateUser(currentUserId,updateUserDto)
    return this.userService.buildUserResponse(user)
  }
}
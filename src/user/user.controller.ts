import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    //
  }

  @Get()
  user() {
    return this.userService.getUser();
  }

  @Post('newUser')
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }
  @Patch()
  editUser(@Body() user: any) {
    return this.userService.editUser(user);
  }
}

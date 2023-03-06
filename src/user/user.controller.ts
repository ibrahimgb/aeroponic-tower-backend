import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    //
  }

  @Post('newUser')
  addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }
  @Patch('editUser')
  editUser(@Body() user: any) {
    return this.userService.editUser(user);
  }
}

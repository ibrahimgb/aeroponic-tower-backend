import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {
    //
  }

  @Get()
  user(){
    return ({
     "name": "ibrahim",
     "age": 22
    })
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

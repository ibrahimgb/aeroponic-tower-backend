import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Observable, of } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';
import path = require('path');

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};
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

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @UseGuards(JwtGuard)
  @Post('uploadAvatar')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadFile(@UploadedFile() file, @Request() req) {
    const user: User = req.user;
    console.log(file);

    return this.userService.addAvatar(file.filename, user.id);
    // .pipe(
    //     tap((user: User) => console.log(user)),
    //     map((user:User) => ({profileImage: user.profileImage}))
    // )
  }

  // @Get('profile-image/:imagename')
  // findProfileImage(
  //   @Param('imagename') imagename,
  //   @Res() res,
  // ): Observable<Object> {
  //   console.log('getting');
  //   return of(
  //     res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)),
  //   );
  // }

  @Get('profile-image/:imagename')
  findProfileImage(
    @Param('imagename') imagename,
    @Res() res,
  ): Observable<Object> {
    console.log('getting');
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileimages/' + imagename)),
    );
  }

  @UseGuards(JwtGuard)
  @Delete('profile-image/')
  deleteAvatar(@Request() req) {
    const user: User = req.user;

    return this.userService.deleteAvatar(user.id);
    // .pipe(
    //     tap((user: User) => console.log(user)),
    //     map((user:User) => ({profileImage: user.profileImage}))
    // )
  }

  @UseGuards(JwtGuard)
  @Get('getGroup')
  getGroup(@Request() req) {
    const user: User = req.user;
    console.log(user);
    return this.userService.getGroup(user.id);
  }

  @UseGuards(JwtGuard)
  @Get('getAllMyGroupUsers')
  getGroupUsers(@Request() req) {
    const user: User = req.user;

    console.log(user);
    return this.userService.getGroupUsers(user);
    // .pipe(
    //     tap((user: User) => console.log(user)),
    //     map((user:User) => ({profileImage: user.profileImage}))
    // )
  }
  //Working
  @UseGuards(JwtGuard)
  @Post('addUserToGroup')
  addUserToGroup(@Request() req, @Body() emailObj: any) {
    const user: User = req.user;

    console.log(user);
    return this.userService.addUserToGroup(user, emailObj.email);
    // .pipe(
    //     tap((user: User) => console.log(user)),
    //     map((user:User) => ({profileImage: user.profileImage}))
    // )
  }

  @UseGuards(JwtGuard) //TODO:
  @Delete('removeUserFromGroup/:id')
  removeUserFromGroup(@Request() req, @Param('id') id) {
    const user: User = req.user;

    //console.log(user);
    //if (user.isAdmin) {
    return this.userService.removeUserFromGroup(Number(id), user);
    //}

    // .pipe(
    //     tap((user: User) => console.log(user)),
    //     map((user:User) => ({profileImage: user.profileImage}))
    // )
  }

  @UseGuards(JwtGuard)
  @Get('profile-image/')
  finduserProfileImage(@Request() req, @Res() res): Observable<Object> {
    console.log('getting');
    const user: User = req.user;
    return of(
      res.sendFile(join(process.cwd(), 'uploads/profileimages/' + user.avatar)),
    );
  }
}

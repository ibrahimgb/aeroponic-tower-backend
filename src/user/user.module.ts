import { Controller, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [UserService],
  controllers: [UserController],
})
@Controller('user')
export class UserModule {
  constructor(private userService: UserService) {
    //
  }
}

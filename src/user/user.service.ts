import { Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaDbService) {}

  async addUser(user: any) {
    const newUser = await this.prisma.user.create({
      data: {
        name: 'Elsa Prisma',
      },
    });
  }
}

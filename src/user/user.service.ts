import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaDbService) {}

  async addUser(user: User) {
    const newUser = await this.prisma.user.create({
      data: {
        createdAt: Date(),
        updatedAt: Date(),
        email: user.email,
        hash: user.hash,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
    return newUser;
  }

  async editUser(user: any) {
    const editedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        createdAt: Date(),
        updatedAt: Date(),
        email: user.email,
        hash: user.hash,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }
}

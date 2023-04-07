import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaDbService) {}

  async getUser() {
    const user = await this.prisma.user.findFirst();
    return user;
  }

  async getGroup(id: number) {
    const group = await this.prisma.group.findFirst({
      where: {
        adminId: id,
      },
    });
    console.log(group);
    return group;
  }

  async getGroupUsers(admin) {
    const adminId = admin.id;
    const group = await this.prisma.group.findFirst({
      where: {
        adminId: adminId,
      },
    });
    // const users = this.prisma.usersOnGroup.findMany({
    //   where: {
    //     id : group.id
    //   },
    // })
    const usersOnGroup = await this.prisma.usersOnGroup.findMany({
      where: {
        groupId: group.id,
      },
    });

    let usersID = usersOnGroup.map((i) => i.userId);

    let users = await this.prisma.user.findMany({
      where: {
        id: { in: usersID },
      },
    });
    users.unshift(admin);

    return users;
  }

  async addUserToGroup(admin, email) {
    let user = await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: email,
        },
      });
    }

    let group = await this.prisma.group.findFirst({
      where: {
        adminId: admin.id,
      },
    });

    if (!group) {
      group = await this.prisma.group.create({
        data: {
          name: `${user.firstName} group`,
          adminId: admin.id,
        },
      });

      await this.prisma.user.update({
        where: {
          id: admin.id,
        },
        data: {
          mainAdminOf: group.id,
        },
      });
    }

    try {
      const usersOnGroup = await this.prisma.usersOnGroup.create({
        data: {
          userId: user.id,
          groupId: group.id,
        },
      });
      return usersOnGroup;
    } catch (error) {
      throw new ForbiddenException('User Already Added');
    }
  }

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

  async addAvatar(filename: string, id: number) {
    const editedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        avatar: filename,
      },
    });

    return editedUser.avatar;
  }

  async removeUserFromGroup(userId: number, admin: User) {
    const group = await this.prisma.group.findFirst({
      where: {
        adminId: admin.id,
      },
    });
    console.log('wsalnii');

    if (!(userId === admin.id)) {
      const editedUser = await this.prisma.usersOnGroup.deleteMany({
        where: {
          groupId: group.id,
          userId: userId,
        },
      });
    } else {
      console.log('errer');
      throw new HttpException('Cant Delete Admin', HttpStatus.FORBIDDEN);
    }
  }

  async deleteAvatar(id: number) {
    const editedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        avatar: null,
      },
    });

    return editedUser.avatar;
  }

  async removeAvatar(id: number) {
    const editedUser = await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        avatar: null,
      },
    });
  }

  async editUser(user: any) {
    const editedUser = await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      },
    });
  }
}

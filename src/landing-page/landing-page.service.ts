import { Injectable } from '@nestjs/common';
import { PrismaDbService } from 'src/prisma_db/prisma_db.service';

@Injectable()
export class LandingPageService {
  constructor(private prisma: PrismaDbService) {}

  async addFormData(formData) {
    // let phoneNumber = formData.phoneNumber;
    // while (phoneNumber.charAt(0) === '+') {
    //   phoneNumber = phoneNumber.substring(1);
    // }

    // const phoneNumberInt = Number(JSON.parse(JSON.stringify(phoneNumber)));

    const res = await this.prisma.contactUs.create({
      data: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
      },
    });

    return res;
  }

  async addEmail(email) {
    const res = await this.prisma.emailSubscribe.create({
      data: {
        email: email,
      },
    });
  }
}

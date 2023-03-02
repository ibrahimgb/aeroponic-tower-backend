

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import { url } from 'inspector';


@Injectable()
export class PrismaDbService extends PrismaClient {
  constructor(confing: ConfigService) {
    super({
      datasources: {
        db: {
          url: confing.get('DATABASE_URL'),
        },
      },
    });
  }

  createUser(){
    const user = this.user.create(
      {data:{
        name:"ibrahim"
      }}
    )
    console.log(user)
  }

  cleanDb() {
    
    //this.$transaction([])
    this.user.deleteMany()
    .then(()=>{this.$disconnect()})
      

    
    return;
  }
}
 
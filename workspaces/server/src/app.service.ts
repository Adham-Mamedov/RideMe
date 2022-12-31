import { Injectable } from '@nestjs/common';
import { PrismaService } from '@server/modules/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getUsers() {
    return this.prisma.user.findMany();
  }

  async createUser() {
    return this.prisma.user.create({
      data: {
        email: `adkham+${Math.random()}@gmail.com`,
        name: 'Adkham',
      },
    });
  }
}

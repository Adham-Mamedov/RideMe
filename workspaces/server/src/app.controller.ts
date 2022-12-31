import { Controller, Get } from '@nestjs/common';
import { AppService } from '@server/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  async getUsers() {
    return this.appService.getUsers();
  }

  @Get('new')
  async createUser() {
    return this.appService.createUser();
  }
}

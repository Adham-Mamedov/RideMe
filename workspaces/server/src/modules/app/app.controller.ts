import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '@server/modules/app/app.service';
import { UserEntity } from '@server/modules/app/entities/app.entity';

@Controller()
@ApiTags('App Controller')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: String })
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers() {
    return this.appService.getUsers();
  }

  @Get('new')
  @ApiOkResponse({ type: UserEntity })
  async createUser() {
    return this.appService.createUser();
  }
}

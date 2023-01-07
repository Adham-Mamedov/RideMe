import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from '@server/modules/app/app.service';
import { Route } from '@shared/enums';

@Controller(Route.App)
@ApiTags('App Controller')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOkResponse({ type: String })
  getHello(): string {
    return this.appService.getHello();
  }
}

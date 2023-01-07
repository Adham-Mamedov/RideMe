import {
  Body,
  Controller,
  Get,
  Post,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from '@server/modules/auth/auth.service';
import { AuthGuard } from '@server/common/guards/auth.guard';
import { User } from '@server/common/decorators/user.decorator';

import { Route } from '@shared/enums';
import { LoginDto } from '@server/modules/auth/dto/auth.dto';
import { AuthEntity } from '@server/modules/auth/entities/auth.entity';
import { RequestUser } from '@shared/types/auth.types';

@Controller(Route.Auth)
@ApiTags('Auth Controller')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthEntity })
  async createUser(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('/test')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(AuthGuard)
  async test() {
    return true;
  }

  @Post('refresh')
  @ApiOkResponse({ type: AuthEntity })
  @UseGuards(AuthGuard)
  async refresh(
    @User() user: RequestUser,
    @Headers('Authorization') token: string
  ) {
    return this.authService.refresh(user, token);
  }
}

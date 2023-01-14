import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Res,
  HttpCode,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FastifyReply } from 'fastify';

import { AuthService } from '@server/modules/auth/auth.service';
import { AuthGuard } from '@server/common/guards/auth.guard';
import { RefreshJWTGuard } from '@server/common/guards/refreshJWT.guard';
import { User } from '@server/common/decorators/user.decorator';
import { Cookies } from '@server/common/decorators/cookies.decorator';
import { RefreshTokenCookieName } from '@server/modules/auth/strategies';

import { Route } from '@shared/enums';
import { LoginDto } from '@server/modules/auth/dto/auth.dto';
import { RequestUser } from '@shared/types/auth.types';
import { SuccessEntity } from '@server/common/entities/common.entities';

@Controller(Route.Auth)
@ApiTags('Auth Controller')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: SuccessEntity })
  async loginUser(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    return this.authService.login(res, loginDto);
  }

  @Post('logout')
  @HttpCode(200)
  @ApiOkResponse({ type: SuccessEntity })
  @UseGuards(AuthGuard)
  logoutUser(@Res({ passthrough: true }) res: FastifyReply) {
    return this.authService.logout(res);
  }

  @Get('/test')
  @ApiOkResponse({ type: SuccessEntity })
  @UseGuards(AuthGuard)
  async test() {
    return { success: true };
  }

  @Get('refresh')
  @ApiOkResponse({ type: SuccessEntity })
  @UseGuards(RefreshJWTGuard)
  async refresh(
    @User() user: RequestUser,
    @Cookies(RefreshTokenCookieName) token: string,
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    return this.authService.refresh(res, user, token);
  }
}

import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from '@server/modules/user/user.service';
import { AuthGuard } from '@server/common/guards/auth.guard';

import { Route } from '@shared/enums';
import { UserEntity } from '@server/modules/user/entities/user.entity';
import { CreateUserDto } from '@server/modules/user/dto/user.dto';

@Controller(Route.User)
@ApiTags('User Controller')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('create')
  @ApiCreatedResponse({ type: UserEntity })
  async createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Delete('delete')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(AuthGuard)
  async deleteUsers() {
    return this.userService.dropUsers();
  }
}

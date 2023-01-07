import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { UserService } from '@server/modules/user/user.service';
import RoleGuard from '@server/common/guards/role.guard';

import { Role, Route } from '@shared/enums';
import { UserEntity } from '@server/modules/user/entities/user.entity';
import { CreateUserDto } from '@server/modules/user/dto/user.dto';

@Controller(Route.User)
@ApiTags('User Controller')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity, isArray: true })
  @UseGuards(RoleGuard(Role.Admin))
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post('create')
  @ApiCreatedResponse({ type: UserEntity })
  @UseGuards(RoleGuard(Role.Admin))
  async createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Delete('delete')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(RoleGuard(Role.Owner))
  async deleteUsers() {
    return this.userService.dropUsers();
  }
}

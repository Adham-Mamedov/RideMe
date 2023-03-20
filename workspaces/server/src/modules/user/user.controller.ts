import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { UserService } from '@server/modules/user/user.service';
import RoleGuard from '@server/common/guards/role.guard';

import { ERoute } from '@shared/enums';
import { CreateUserDto } from '@server/modules/user/dto/user.dto';
import { UserEntity } from '@server/modules/user/entities/user.entity';

@Controller(ERoute.Users)
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
  async deleteAllUsers() {
    return this.userService.dropUsers();
  }
}

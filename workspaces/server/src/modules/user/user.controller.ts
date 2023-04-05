import { Body, Controller, Delete, Get, Put, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { UserService } from '@server/modules/user/user.service';
import RoleGuard from '@server/common/guards/role.guard';

import { ERoute } from '@shared/enums';
import { DeleteUserDto, EditUserDto } from '@server/modules/user/dto/user.dto';
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

  @Put('edit')
  @ApiCreatedResponse({ type: UserEntity })
  @UseGuards(RoleGuard(Role.Owner))
  async editUser(@Body() userDto: EditUserDto) {
    return this.userService.editUser(userDto);
  }

  @Delete('delete')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(RoleGuard(Role.Owner))
  async deleteUser(@Body() userDto: DeleteUserDto) {
    return this.userService.deleteUser(userDto);
  }

  @Delete('drop')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(RoleGuard(Role.Owner))
  async deleteAllUsers() {
    return this.userService.dropUsers();
  }
}

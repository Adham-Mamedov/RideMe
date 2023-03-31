import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { RideService } from '@server/modules/ride/ride.service';
import RoleGuard from '@server/common/guards/role.guard';

import { User } from '@server/common/decorators/user.decorator';

import { RideEntity } from '@server/modules/ride/entities/ride.entity';
import {
  CreateRideDto,
  DeleteRideDto,
  EditRideDto,
} from '@server/modules/ride/dto/ride.dto';
import { ERoute } from '@shared/enums';
import { RequestUser } from '@shared/types/auth.types';

@Controller(ERoute.Rides)
@ApiTags('Ride Controller')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Get()
  @ApiOkResponse({ type: RideEntity, isArray: true })
  @UseGuards(RoleGuard(Role.Admin))
  async getAll() {
    return this.rideService.getAll();
  }

  @Get('/by-user')
  @ApiOkResponse({ type: RideEntity, isArray: true })
  @UseGuards(RoleGuard(Role.User))
  async getAllByUser(@User() user: RequestUser) {
    return this.rideService.getAllByUser(user.id);
  }

  @Get('/:id')
  @ApiOkResponse({ type: RideEntity, isArray: true })
  @UseGuards(RoleGuard(Role.Admin))
  async getById(@Param('id') id: string) {
    return this.rideService.getById(id);
  }

  @Post('create')
  @ApiCreatedResponse({ type: RideEntity })
  @UseGuards(RoleGuard(Role.User))
  async createStation(@Body() dto: CreateRideDto, @User() user: RequestUser) {
    return this.rideService.create(dto, user);
  }

  @Put('edit')
  @ApiCreatedResponse({ type: RideEntity })
  @UseGuards(RoleGuard(Role.User))
  async editStation(@Body() dto: EditRideDto) {
    return this.rideService.edit(dto);
  }

  @Delete('delete')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(RoleGuard(Role.Admin))
  async deleteStation(@Body() dto: DeleteRideDto) {
    return this.rideService.delete(dto);
  }
}

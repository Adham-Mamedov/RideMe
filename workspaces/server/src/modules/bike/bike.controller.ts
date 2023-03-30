import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import RoleGuard from '@server/common/guards/role.guard';

import { ERoute } from '@shared/enums';
import { BikeService } from '@server/modules/bike/bike.service';
import { BikeEntity } from '@server/modules/bike/entities/bike.entity';
import {
  CreateBikeDto,
  DeleteBikeDto,
  EditBikeDto,
} from '@server/modules/bike/dto/bike.dto';

@Controller(ERoute.Bikes)
@ApiTags('Bike Controller')
export class BikeController {
  constructor(private readonly bikeService: BikeService) {}

  @Get()
  @ApiOkResponse({ type: BikeEntity, isArray: true })
  @UseGuards(RoleGuard(Role.User))
  async getAll(@Query('available') availableOnly: boolean) {
    return this.bikeService.getAll(availableOnly);
  }

  @Get('/:id')
  @ApiOkResponse({ type: BikeEntity, isArray: true })
  @UseGuards(RoleGuard(Role.User))
  async getById(@Param('id') id: string) {
    return this.bikeService.getById(id);
  }

  @Post('create')
  @ApiCreatedResponse({ type: BikeEntity })
  @UseGuards(RoleGuard(Role.Admin))
  async createStation(@Body() dto: CreateBikeDto) {
    return this.bikeService.create(dto);
  }

  @Put('edit')
  @ApiCreatedResponse({ type: BikeEntity })
  @UseGuards(RoleGuard(Role.Admin))
  async editStation(@Body() dto: EditBikeDto) {
    return this.bikeService.edit(dto);
  }

  @Delete('delete')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(RoleGuard(Role.Admin))
  async deleteStation(@Body() dto: DeleteBikeDto) {
    return this.bikeService.delete(dto);
  }
}

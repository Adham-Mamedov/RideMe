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

import { StationService } from '@server/modules/station/station.service';
import RoleGuard from '@server/common/guards/role.guard';

import { ERoute } from '@shared/enums';
import { StationEntity } from '@server/modules/station/entities/station.entity';
import {
  CreateStationDto,
  DeleteStationDto,
  EditStationDto,
} from '@server/modules/station/dto/station.dto';

@Controller(ERoute.Stations)
@ApiTags('Station Controller')
export class StationController {
  constructor(private readonly stationService: StationService) {}

  @Get()
  @ApiOkResponse({ type: StationEntity, isArray: true })
  @UseGuards(RoleGuard(Role.User))
  async getAll() {
    return this.stationService.getAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: StationEntity, isArray: true })
  @UseGuards(RoleGuard(Role.User))
  async getById(@Param('id') id: string) {
    return this.stationService.getById(id);
  }

  @Post('create')
  @ApiCreatedResponse({ type: StationEntity })
  @UseGuards(RoleGuard(Role.Admin))
  async createStation(@Body() stationDto: CreateStationDto) {
    return this.stationService.createStation(stationDto);
  }

  @Put('edit')
  @ApiCreatedResponse({ type: StationEntity })
  @UseGuards(RoleGuard(Role.Admin))
  async editStation(@Body() stationDto: EditStationDto) {
    return this.stationService.editStation(stationDto);
  }

  @Delete('delete')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(RoleGuard(Role.Admin))
  async deleteStation(@Body() stationDto: DeleteStationDto) {
    return this.stationService.deleteStation(stationDto);
  }
}

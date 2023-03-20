import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Station } from '@prisma/client';

import { EErrorMessages } from '@shared/enums';
import {
  CreateStationDto,
  DeleteStationDto,
  EditStationDto,
} from '@server/modules/station/dto/station.dto';
import { IStation } from '@shared/types/assets.types';

@Injectable()
export class StationService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<IStation[]> {
    try {
      const dbStations = await this.prisma.station.findMany();
      return dbStations.map((station) => this.deserializeStation(station));
    } catch (error) {
      Logger.error(error, 'StationService:getAll');
      throw new NotFoundException();
    }
  }

  async getById(id: string): Promise<IStation> {
    try {
      const dbStation = await this.prisma.station.findUnique({
        where: {
          id,
        },
      });

      return this.deserializeStation(dbStation);
    } catch (error) {
      Logger.error(error, 'StationService:getById');
      throw new NotFoundException(EErrorMessages.StationNotFound);
    }
  }

  async createStation(station: CreateStationDto): Promise<IStation> {
    try {
      const serializedStation = {
        ...station,
        bikes: JSON.stringify(station.bikes),
        location: JSON.stringify(station.location),
      };
      const createdStation = await this.prisma.station.create({
        data: serializedStation,
      });

      return this.deserializeStation(createdStation);
    } catch (error) {
      Logger.error(error, 'StationService:createStation');
      throw new InternalServerErrorException(
        EErrorMessages.CreateStationFailed
      );
    }
  }

  async editStation(station: EditStationDto): Promise<IStation> {
    try {
      const serializedStation = {
        ...station,
        bikes: JSON.stringify(station.bikes),
        location: JSON.stringify(station.location),
      };
      delete serializedStation.id;

      const dbStation = await this.prisma.station.update({
        where: {
          id: station.id,
        },
        data: serializedStation,
      });

      return this.deserializeStation(dbStation);
    } catch (error) {
      Logger.error(error, 'StationService:editStation');
      throw new InternalServerErrorException(EErrorMessages.EditStationFailed);
    }
  }

  async deleteStation({ id }: DeleteStationDto): Promise<boolean> {
    try {
      await this.prisma.station.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      Logger.error(error, 'StationService:deleteStation');
      throw new InternalServerErrorException(
        EErrorMessages.DeleteStationFailed
      );
    }
  }

  deserializeStation(station: Station): IStation {
    return {
      ...station,
      location: JSON.parse(station.location.toString()),
      bikes: JSON.parse(station.bikes.toString()),
    };
  }
}

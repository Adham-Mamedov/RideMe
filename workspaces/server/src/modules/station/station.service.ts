import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Station } from '@prisma/client';

import { BikeService } from '@server/modules/bike/bike.service';

import {
  CreateStationDto,
  DeleteStationDto,
  EditStationDto,
} from '@server/modules/station/dto/station.dto';
import { IStation } from '@shared/types/assets.types';
import { EErrorMessages } from '@shared/enums';

@Injectable()
export class StationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly bikeService: BikeService
  ) {}

  async getAll(): Promise<IStation[]> {
    try {
      const dbStations = await this.prisma.station.findMany();
      return dbStations.map((station) => this.deserialize(station));
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

      return this.deserialize(dbStation);
    } catch (error) {
      Logger.error(error, 'StationService:getById');
      throw new NotFoundException(EErrorMessages.StationNotFound);
    }
  }

  async create(station: CreateStationDto): Promise<IStation> {
    try {
      const serializedStation = {
        ...station,
        bikes: JSON.stringify(station.bikes),
        location: JSON.stringify(station.location),
      };
      const createdStation = await this.prisma.station.create({
        data: serializedStation,
      });

      const promises = station.bikes.map((bikeId) => {
        return (async () => {
          const bike = await this.bikeService.getById(bikeId);

          await this.bikeService.edit({
            ...bike,
            stationId: createdStation.id,
          });
        })();
      });

      await Promise.all(promises);

      return this.deserialize(createdStation);
    } catch (error) {
      Logger.error(error, 'StationService:createStation');
      throw new InternalServerErrorException(
        EErrorMessages.CreateStationFailed
      );
    }
  }

  async edit(stationDto: EditStationDto): Promise<IStation> {
    try {
      const serializedStation = {
        ...stationDto,
        bikes: JSON.stringify(stationDto.bikes),
        location: JSON.stringify(stationDto.location),
      };
      const id = serializedStation.id;
      delete serializedStation.id;
      const dbStation = await this.getById(id);

      const dbUpdatedStation = await this.prisma.station.update({
        where: {
          id,
        },
        data: serializedStation,
      });

      const oldBikes = JSON.parse(dbStation.bikes.toString());
      const newBikes = stationDto.bikes;

      const promises = newBikes
        .map((bikeId) => {
          const isWithinOldBikes = oldBikes.includes(bikeId);
          if (isWithinOldBikes) return;

          return (async () => {
            const bike = await this.bikeService.getById(bikeId);

            await this.bikeService.edit({
              ...bike,
              stationId: dbUpdatedStation.id,
            });
          })();
        })
        .filter(Boolean);

      oldBikes.forEach((bikeId) => {
        const isWithinNewBikes = newBikes.includes(bikeId);
        if (isWithinNewBikes) return;

        promises.push(
          (async () => {
            const bike = await this.bikeService.getById(bikeId);

            await this.bikeService.edit({
              ...bike,
              stationId: null,
            });
          })()
        );
      });

      await Promise.all(promises);

      return this.deserialize(dbUpdatedStation);
    } catch (error) {
      Logger.error(error, 'StationService:editStation');
      throw new InternalServerErrorException(EErrorMessages.EditStationFailed);
    }
  }

  async delete({ id }: DeleteStationDto): Promise<boolean> {
    try {
      const dbStation = await this.prisma.station.delete({
        where: {
          id,
        },
      });
      const bikes = JSON.parse(dbStation.bikes.toString());

      const promises = bikes.map((bikeId) => {
        return (async () => {
          const bike = await this.bikeService.getById(bikeId);

          await this.bikeService.edit({
            ...bike,
            stationId: null,
          });
        })();
      });

      await Promise.all(promises);

      return true;
    } catch (error) {
      Logger.error(error, 'StationService:deleteStation');
      throw new InternalServerErrorException(
        EErrorMessages.DeleteStationFailed
      );
    }
  }

  deserialize(station: Station): IStation {
    return {
      ...station,
      location: JSON.parse(station.location.toString()),
      bikes: JSON.parse(station.bikes.toString()),
    };
  }
}

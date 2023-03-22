import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Bike } from '@prisma/client';

import { StationService } from '@server/modules/station/station.service';

import {
  CreateBikeDto,
  DeleteBikeDto,
  EditBikeDto,
} from '@server/modules/bike/dto/bike.dto';
import { EErrorMessages } from '@shared/enums';

@Injectable()
export class BikeService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => StationService))
    private readonly stationService: StationService
  ) {}

  async getAll(): Promise<Bike[]> {
    try {
      return this.prisma.bike.findMany();
    } catch (error) {
      Logger.error(error, 'BikeService:getAll');
      throw new NotFoundException();
    }
  }

  async getById(id: string): Promise<Bike> {
    try {
      return this.prisma.bike.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      Logger.error(error, 'BikeService:getById');
      throw new NotFoundException(EErrorMessages.BikeNotFound);
    }
  }

  async create(bike: CreateBikeDto): Promise<Bike> {
    try {
      const dbBike = await this.prisma.bike.create({
        data: bike,
      });

      if (bike.stationId) {
        const station = await this.stationService.getById(bike.stationId);
        const id = station.id;
        delete station.id;

        const bikes = [...station.bikes, dbBike.id];

        await this.prisma.station.update({
          where: {
            id,
          },
          data: {
            ...station,
            location: JSON.stringify(station.location),
            bikes: JSON.stringify(bikes),
          },
        });
      }

      return dbBike;
    } catch (error) {
      Logger.error(error, 'BikeService:createStation');
      throw new InternalServerErrorException(EErrorMessages.CreateBikeFailed);
    }
  }

  async edit(bikeDto: EditBikeDto): Promise<Bike> {
    try {
      const id = bikeDto.id;
      delete bikeDto.id;

      const dbBike = await this.getById(id);

      const dbUpdatedBike = await this.prisma.bike.update({
        where: {
          id,
        },
        data: bikeDto,
      });

      if (!bikeDto.stationId && !dbBike.stationId) return dbUpdatedBike;

      if (bikeDto.stationId !== dbBike.stationId) {
        if (dbBike.stationId) {
          const oldStation = await this.stationService.getById(
            dbBike.stationId
          );
          const id = oldStation.id;
          delete oldStation.id;

          const bikes = oldStation.bikes.filter((b) => b !== dbUpdatedBike.id);

          await this.prisma.station.update({
            where: {
              id,
            },
            data: {
              ...oldStation,
              location: JSON.stringify(oldStation.location),
              bikes: JSON.stringify(bikes),
            },
          });
        }

        if (bikeDto.stationId) {
          const newStation = await this.stationService.getById(
            bikeDto.stationId
          );
          const id = newStation.id;
          delete newStation.id;

          const bikes = [...newStation.bikes, dbUpdatedBike.id];

          await this.prisma.station.update({
            where: {
              id,
            },
            data: {
              ...newStation,
              location: JSON.stringify(newStation.location),
              bikes: JSON.stringify(bikes),
            },
          });
        }
      }

      return dbUpdatedBike;
    } catch (error) {
      Logger.error(error, 'BikeService:editStation');
      throw new InternalServerErrorException(EErrorMessages.EditBikeFailed);
    }
  }

  async delete({ id }: DeleteBikeDto): Promise<boolean> {
    try {
      const dbBike = await this.prisma.bike.delete({
        where: {
          id,
        },
      });

      if (dbBike.stationId) {
        const station = await this.stationService.getById(dbBike.stationId);
        const bikes = station.bikes.filter((b) => b !== dbBike.id);

        const id = station.id;
        delete station.id;

        await this.prisma.station.update({
          where: {
            id,
          },
          data: {
            ...station,
            location: JSON.stringify(station.location),
            bikes: JSON.stringify(bikes),
          },
        });
      }

      return true;
    } catch (error) {
      Logger.error(error, 'BikeService:deleteStation');
      throw new InternalServerErrorException(EErrorMessages.DeleteBikeFailed);
    }
  }
}

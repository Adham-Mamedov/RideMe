import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

import { BikeService } from '@server/modules/bike/bike.service';
import { exclude, excludeFromArray } from '@shared/utils/object.utils';

import {
  CreateRideDto,
  DeleteRideDto,
  EditRideDto,
} from '@server/modules/ride/dto/ride.dto';
import { EErrorMessages } from '@shared/enums';
import { RequestUser } from '@shared/types/auth.types';
import { IRide } from '@shared/types/assets.types';

@Injectable()
export class RideService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(BikeService)
    private readonly bikeService: BikeService
  ) {}

  async getAll(): Promise<IRide[]> {
    try {
      const dbRides = await this.prisma.ride.findMany();

      return excludeFromArray<IRide, 'userId'>(dbRides, ['userId']);
    } catch (error) {
      Logger.error(error, 'RideService:getAll');
      throw new NotFoundException();
    }
  }

  async getAllByUser(userId: RequestUser['id']): Promise<IRide[]> {
    try {
      const dbRides = await this.prisma.ride.findMany({
        where: {
          userId,
        },
      });

      return excludeFromArray<IRide, 'userId'>(dbRides, ['userId']);
    } catch (error) {
      Logger.error(error, 'RideService:getAll');
      throw new NotFoundException();
    }
  }

  async getById(id: string): Promise<IRide> {
    try {
      const dbRide = await this.prisma.ride.findUnique({
        where: {
          id,
        },
      });

      return exclude<IRide, 'userId'>(dbRide, ['userId']);
    } catch (error) {
      Logger.error(error, 'RideService:getById');
      throw new NotFoundException(EErrorMessages.RideNotFound);
    }
  }

  async create(ride: CreateRideDto, user: RequestUser): Promise<IRide> {
    try {
      const createdRide = await this.prisma.ride.create({
        data: {
          ...ride,
          userId: user.id,
          timeStart: new Date(),
          timeEnd: null,
          cost: 0,
          distance: 0,
          stationToId: null,
        },
      });

      const bike = await this.bikeService.getById(createdRide.bikeId);
      await this.bikeService.edit({
        ...bike,
        isAvailable: false,
      });

      return exclude<IRide, 'userId'>(createdRide, ['userId']);
    } catch (error) {
      Logger.error(error, 'RideService:create');
      throw new InternalServerErrorException(EErrorMessages.CreateRideFailed);
    }
  }

  async edit(ride: EditRideDto): Promise<IRide> {
    try {
      const id = ride.id;

      const dbRide = await this.prisma.ride.findUnique({
        where: {
          id,
        },
      });
      const bike = await this.bikeService.getById(dbRide.bikeId);

      const cost = (() => {
        const now = new Date().getTime();
        const difference = now - dbRide.timeStart.getTime();
        const minutes = Math.ceil(difference / 1000 / 60) - bike.freeMinutes;
        return minutes <= 0 ? 0 : minutes * bike.pricePerMinute;
      })();

      delete ride.id;
      delete dbRide.id;

      const updatedRide = await this.prisma.ride.update({
        where: {
          id,
        },
        data: {
          ...dbRide,
          ...ride,
          cost,
          timeEnd: new Date(),
        },
      });

      await this.bikeService.edit({
        ...bike,
        isAvailable: true,
        stationId: updatedRide.stationToId,
      });

      return exclude<IRide, 'userId'>(updatedRide, ['userId']);
    } catch (error) {
      Logger.error(error, 'RideService:edit');
      throw new InternalServerErrorException(EErrorMessages.EditRideFailed);
    }
  }

  async delete({ id }: DeleteRideDto): Promise<boolean> {
    try {
      await this.prisma.ride.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      Logger.error(error, 'RideService:delete');
      throw new InternalServerErrorException(EErrorMessages.DeleteRideFailed);
    }
  }
}

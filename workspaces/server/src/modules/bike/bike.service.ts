import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Bike } from '@prisma/client';

import {
  CreateBikeDto,
  DeleteBikeDto,
  EditBikeDto,
} from '@server/modules/bike/dto/bike.dto';
import { EErrorMessages } from '@shared/enums';

@Injectable()
export class BikeService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Bike[]> {
    try {
      return await this.prisma.bike.findMany();
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
      return this.prisma.bike.create({
        data: bike,
      });
    } catch (error) {
      Logger.error(error, 'BikeService:createStation');
      throw new InternalServerErrorException(EErrorMessages.CreateBikeFailed);
    }
  }

  async edit(bike: EditBikeDto): Promise<Bike> {
    try {
      const id = bike.id;
      delete bike.id;

      return this.prisma.bike.update({
        where: {
          id,
        },
        data: bike,
      });
    } catch (error) {
      Logger.error(error, 'BikeService:editStation');
      throw new InternalServerErrorException(EErrorMessages.EditBikeFailed);
    }
  }

  async delete({ id }: DeleteBikeDto): Promise<boolean> {
    try {
      await this.prisma.bike.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      Logger.error(error, 'BikeService:deleteStation');
      throw new InternalServerErrorException(EErrorMessages.DeleteBikeFailed);
    }
  }
}

import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BikeController } from '@server/modules/bike/bike.controller';
import { BikeService } from '@server/modules/bike/bike.service';

@Module({
  controllers: [BikeController],
  providers: [PrismaService, BikeService],
  exports: [BikeService],
})
export class BikeModule {}

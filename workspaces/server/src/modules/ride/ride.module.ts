import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RideController } from '@server/modules/ride/ride.controller';
import { RideService } from '@server/modules/ride/ride.service';
import { BikeModule } from '@server/modules/bike/bike.module';

@Module({
  imports: [BikeModule],
  controllers: [RideController],
  providers: [PrismaService, RideService],
  exports: [RideService],
})
export class RideModule {}

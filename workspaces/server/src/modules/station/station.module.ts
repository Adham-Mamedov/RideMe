import { forwardRef, Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { StationController } from '@server/modules/station/station.controller';
import { StationService } from '@server/modules/station/station.service';
import { BikeModule } from '@server/modules/bike/bike.module';

@Module({
  imports: [forwardRef(() => BikeModule)],
  controllers: [StationController],
  providers: [PrismaService, StationService],
  exports: [StationService],
})
export class StationModule {}

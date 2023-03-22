import { Ride } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class RideEntity implements Partial<Ride> {
  @ApiProperty({ example: 'id' })
  id: Ride['id'];

  @ApiProperty({ example: 'bikeId' })
  bikeId: Ride['bikeId'];

  @ApiProperty({ example: 'stationFromId' })
  stationFromId: Ride['stationFromId'];

  @ApiProperty({ example: 'stationToId' })
  stationToId: Ride['stationToId'];

  @ApiProperty({ example: new Date() })
  timeStart: Ride['timeStart'];

  @ApiProperty({ example: new Date() })
  timeEnd: Ride['timeEnd'];

  @ApiProperty({ example: 1000 })
  cost: Ride['cost'];

  @ApiProperty({ example: 0 })
  distance: Ride['distance'];

  constructor(partial: Partial<RideEntity>) {
    Object.assign(this, partial);
  }
}

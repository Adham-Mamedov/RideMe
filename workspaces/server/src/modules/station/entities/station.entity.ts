import { Station } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class StationEntity implements Partial<Station> {
  @ApiProperty({ example: 'stationId' })
  id: string;

  @ApiProperty({ example: 'Station Title' })
  title: Station['title'];

  @ApiProperty({ example: [120, 130] })
  location: Array<number>;

  @ApiProperty({ example: ['bikeId1', 'bikeId2'] })
  bikes: Array<string>;

  constructor(
    id: string,
    title: string,
    location: Array<number>,
    bikes: Array<string>
  ) {
    this.id = id;
    this.title = title;
    this.location = location;
    this.bikes = bikes;
  }
}

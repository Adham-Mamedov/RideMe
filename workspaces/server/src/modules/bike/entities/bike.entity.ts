import { Bike, Station } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class BikeEntity implements Partial<Bike> {
  @ApiProperty({ example: 'id' })
  id: Bike['id'];

  @ApiProperty({ example: 'stationId' })
  stationId: Station['id'] | null;

  @ApiProperty({ example: true })
  isAvailable: Bike['isAvailable'];

  @ApiProperty({ example: false })
  isBroken: Bike['isBroken'];

  @ApiProperty({ example: 'Bike Title' })
  title: Bike['title'];

  @ApiProperty({ example: 'Bike Description' })
  description: Bike['description'];

  @ApiProperty({ example: 'https://example.com/image.png' })
  imageUrl: Bike['imageUrl'];

  @ApiProperty({ example: 26 })
  wheelSize: Bike['wheelSize'];

  @ApiProperty({ example: 150 })
  recommendedHeight: Bike['recommendedHeight'];

  @ApiProperty({ example: 30 })
  freeMinutes: Bike['freeMinutes'];

  @ApiProperty({ example: 1000 })
  pricePerMinute: Bike['pricePerMinute'];

  constructor(partial: Partial<BikeEntity>) {
    Object.assign(this, partial);
  }
}

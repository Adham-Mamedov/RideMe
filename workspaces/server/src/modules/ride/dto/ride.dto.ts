import { IsString, IsNumber, IsPositive, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Ride } from '@prisma/client';

export class CreateRideDto {
  @ApiProperty({ example: 'bikeId' })
  @IsString()
  bikeId: Ride['bikeId'];

  @ApiProperty({ example: 'stationFromId' })
  @IsString()
  stationFromId: Ride['stationFromId'];

  constructor(bikeId: string, stationFromId: string) {
    this.bikeId = bikeId;
    this.stationFromId = stationFromId;
  }
}

export class EditRideDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: Ride['id'];

  @ApiProperty({ example: 'stationToId' })
  @IsString()
  @IsOptional()
  stationToId: Ride['stationToId'];

  @ApiProperty({ example: 0 })
  @IsPositive()
  @IsNumber()
  distance: Ride['distance'];

  constructor(id: string, stationToId: string, distance: number) {
    this.id = id;
    this.stationToId = stationToId;
    this.distance = distance;
  }
}

export class DeleteRideDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: Ride['id'];

  constructor(id: string) {
    this.id = id;
  }
}

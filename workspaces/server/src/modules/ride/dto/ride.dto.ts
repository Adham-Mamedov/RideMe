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
}

export class DeleteRideDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: Ride['id'];
}

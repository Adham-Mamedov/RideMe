import {
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Station } from '@prisma/client';

export class CreateStationDto {
  @ApiProperty({ example: 'Station Title' })
  @MinLength(3)
  @MaxLength(300)
  @IsString()
  title: Station['title'];

  @ApiProperty({ example: [120, 130] })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  location: Array<number>;

  @ApiProperty({ example: ['bikeId1', 'bikeId2'] })
  @IsArray()
  bikes: Array<string>;
}

export class EditStationDto {
  @ApiProperty({ example: 'stationId' })
  @IsString()
  id: Station['id'];

  @ApiProperty({ example: 'Station Title' })
  @MinLength(3)
  @MaxLength(300)
  @IsString()
  title: Station['title'];

  @ApiProperty({ example: [120, 130] })
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  location: Array<number>;

  @ApiProperty({ example: ['bikeId1', 'bikeId2'] })
  @IsArray()
  bikes: Array<string>;
}

export class DeleteStationDto {
  @ApiProperty({ example: 'stationId' })
  @IsString()
  id: Station['id'];
}

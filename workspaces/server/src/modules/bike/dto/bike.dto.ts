import {
  IsString,
  IsBoolean,
  IsUrl,
  IsNumber,
  IsPositive,
  MaxLength,
  MinLength,
  IsOptional,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Bike, Station } from '@prisma/client';

export class CreateBikeDto {
  @ApiProperty({ example: 'stationId' })
  @IsString()
  @IsOptional()
  stationId: Station['id'] | null;

  @ApiProperty({ example: true })
  @IsBoolean()
  isAvailable: Bike['isAvailable'];

  @ApiProperty({ example: false })
  @IsBoolean()
  isBroken: Bike['isBroken'];

  @ApiProperty({ example: 'Bike Title' })
  @MaxLength(300)
  @MinLength(3)
  @IsString()
  title: Bike['title'];

  @ApiProperty({ example: 'Bike Description' })
  @MaxLength(500)
  @MinLength(3)
  @IsString()
  description: Bike['description'];

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsString()
  @IsUrl()
  imageUrl: Bike['imageUrl'];

  @ApiProperty({ example: 26 })
  @IsNumber()
  @IsPositive()
  @Max(50)
  wheelSize: Bike['wheelSize'];

  @ApiProperty({ example: 150 })
  @IsNumber()
  @IsPositive()
  @Max(250)
  recommendedHeight: Bike['recommendedHeight'];

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(0)
  freeMinutes: Bike['freeMinutes'];

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(0)
  pricePerMinute: Bike['pricePerMinute'];

  constructor(
    stationId: Station['id'] | null,
    isAvailable: Bike['isAvailable'],
    isBroken: Bike['isBroken'],
    title: Bike['title'],
    description: Bike['description'],
    imageUrl: Bike['imageUrl'],
    wheelSize: Bike['wheelSize'],
    recommendedHeight: Bike['recommendedHeight'],
    freeMinutes: Bike['freeMinutes'],
    pricePerMinute: Bike['pricePerMinute']
  ) {
    this.stationId = stationId;
    this.isAvailable = isAvailable;
    this.isBroken = isBroken;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.wheelSize = wheelSize;
    this.recommendedHeight = recommendedHeight;
    this.freeMinutes = freeMinutes;
    this.pricePerMinute = pricePerMinute;
  }
}

export class EditBikeDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: Bike['id'];

  @ApiProperty({ example: 'stationId' })
  @IsString()
  @IsOptional()
  stationId: Station['id'];

  @ApiProperty({ example: true })
  @IsBoolean()
  isAvailable: Bike['isAvailable'];

  @ApiProperty({ example: false })
  @IsBoolean()
  isBroken: Bike['isBroken'];

  @ApiProperty({ example: 'Bike Title' })
  @MaxLength(300)
  @MinLength(3)
  @IsString()
  title: Bike['title'];

  @ApiProperty({ example: 'Bike Description' })
  @MaxLength(500)
  @MinLength(3)
  @IsString()
  description: Bike['description'];

  @ApiProperty({ example: 'https://example.com/image.png' })
  @IsString()
  @IsUrl()
  imageUrl: Bike['imageUrl'];

  @ApiProperty({ example: 26 })
  @IsNumber()
  @IsPositive()
  @Max(50)
  wheelSize: Bike['wheelSize'];

  @ApiProperty({ example: 150 })
  @IsNumber()
  @IsPositive()
  @Max(250)
  recommendedHeight: Bike['recommendedHeight'];

  @ApiProperty({ example: 30 })
  @IsNumber()
  @Min(0)
  freeMinutes: Bike['freeMinutes'];

  @ApiProperty({ example: 1000 })
  @IsNumber()
  @Min(0)
  pricePerMinute: Bike['pricePerMinute'];

  constructor(
    id: string,
    stationId: Station['id'] | null,
    isAvailable: Bike['isAvailable'],
    isBroken: Bike['isBroken'],
    title: Bike['title'],
    description: Bike['description'],
    imageUrl: Bike['imageUrl'],
    wheelSize: Bike['wheelSize'],
    recommendedHeight: Bike['recommendedHeight'],
    freeMinutes: Bike['freeMinutes'],
    pricePerMinute: Bike['pricePerMinute']
  ) {
    this.id = id;
    this.stationId = stationId;
    this.isAvailable = isAvailable;
    this.isBroken = isBroken;
    this.title = title;
    this.description = description;
    this.imageUrl = imageUrl;
    this.wheelSize = wheelSize;
    this.recommendedHeight = recommendedHeight;
    this.freeMinutes = freeMinutes;
    this.pricePerMinute = pricePerMinute;
  }
}

export class DeleteBikeDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: Bike['id'];

  constructor(id: string) {
    this.id = id;
  }
}

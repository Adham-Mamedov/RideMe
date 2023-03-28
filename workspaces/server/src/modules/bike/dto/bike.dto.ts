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
}

export class DeleteBikeDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: Bike['id'];
}

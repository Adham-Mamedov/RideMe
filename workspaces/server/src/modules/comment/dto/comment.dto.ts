import { IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Comment } from '@prisma/client';

export class CreateCommentDto {
  @ApiProperty({ example: 'rideId' })
  @IsString()
  rideId: Comment['rideId'];

  @ApiProperty({ example: 'Some Comment from user.' })
  @MaxLength(500)
  @MinLength(3)
  @IsString()
  text: Comment['text'];
}

export class EditCommentDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: Comment['id'];

  @ApiProperty({ example: 'Some Comment from user.' })
  @MaxLength(500)
  @MinLength(3)
  @IsString()
  text: Comment['text'];
}

export class DeleteCommentDto {
  @ApiProperty({ example: 'id' })
  @IsString()
  id: Comment['id'];
}

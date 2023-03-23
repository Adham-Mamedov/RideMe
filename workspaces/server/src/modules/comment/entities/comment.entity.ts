import { Comment, Ride } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CommentEntity implements Partial<Ride> {
  @ApiProperty({ example: 'id' })
  id: Ride['id'];

  @ApiProperty({ example: 'bikeId' })
  rideId: Comment['rideId'];

  @ApiProperty({ example: 'Some Comment from user.' })
  text: Comment['text'];

  @ApiProperty({ example: new Date() })
  createdAt: Comment['createdAt'];

  constructor(partial: Partial<CommentEntity>) {
    Object.assign(this, partial);
  }
}

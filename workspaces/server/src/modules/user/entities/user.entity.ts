import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@shared/enums';

export class UserEntity implements Partial<User> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: Role;
}

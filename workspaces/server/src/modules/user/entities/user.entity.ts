import { Role, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements Partial<User> {
  @ApiProperty({ example: 'example@mail.com' })
  email: string;

  @ApiProperty({ example: 'Foo Bar' })
  name: string;

  @ApiProperty({ example: 'User' })
  role: Role;

  constructor(email: string, name: string, role: Role) {
    this.email = email;
    this.name = name;
    this.role = role;
  }
}

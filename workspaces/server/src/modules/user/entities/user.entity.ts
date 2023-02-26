import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserEntity implements Partial<User> {
  @ApiProperty({ example: 'example@mail.com' })
  email: User['email'];

  @ApiProperty({ example: 'Foo Bar' })
  name: User['name'];

  @ApiProperty({ example: 'User' })
  role: User['role'];

  @ApiProperty({
    example: {
      number: '1234 5678 9012 3456',
      expDate: '12/24',
    },
  })
  card: User['card'];

  constructor(
    email: User['email'],
    name: User['name'],
    role: User['role'],
    card: User['card']
  ) {
    this.email = email;
    this.name = name;
    this.role = role;
    this.card = card;
  }
}

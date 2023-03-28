import {
  IsEmail,
  IsObject,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreateUserDto {
  @ApiProperty({ example: 'example@mail.com' })
  @IsEmail()
  email: User['email'];

  @ApiProperty({ example: 'password' })
  @MaxLength(100)
  @MinLength(1)
  @IsString()
  password: User['password'];

  @ApiProperty({ example: 'Foo Bar' })
  @IsString()
  name: User['name'];

  @ApiProperty({
    example: {
      number: '1234 5678 9012 3456',
      expDate: '12/24',
    },
  })
  @IsObject()
  card: User['card'];
}

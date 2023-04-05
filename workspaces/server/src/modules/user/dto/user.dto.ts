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

  constructor(
    email: string,
    password: string,
    name: string,
    card: User['card']
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.card = card;
  }
}

export class EditUserDto {
  @ApiProperty({ example: 'userID' })
  @IsString()
  @MinLength(1)
  id: User['id'];

  @ApiProperty({ example: 'example@mail.com' })
  @IsEmail()
  email: User['email'];

  @ApiProperty({ example: 'Foo Bar' })
  @IsString()
  name: User['name'];

  @ApiProperty({ example: 'User' })
  @IsString()
  @MinLength(1)
  role: User['role'];

  @ApiProperty({
    example: {
      number: '1234 5678 9012 3456',
      expDate: '12/24',
    },
  })
  @IsObject()
  card: User['card'];

  constructor(id: string, email: string, name: string, card: User['card']) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.card = card;
  }
}

export class DeleteUserDto {
  @ApiProperty({ example: 'userID' })
  @IsString()
  @MinLength(1)
  id: User['id'];

  constructor(id: string) {
    this.id = id;
  }
}

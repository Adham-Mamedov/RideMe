import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsValidExpDate } from '@server/common/decorators/validate.decorator';

class UserCartDto {
  @IsNumberString()
  @Length(16, 16)
  number: User['card']['number'];

  @IsString()
  @Length(5, 5)
  @IsValidExpDate()
  expDate: User['card']['expDate'];
}

export class CreateUserDto {
  @ApiProperty({ example: 'example@mail.com' })
  @MaxLength(50)
  @IsEmail()
  email: User['email'];

  @ApiProperty({ example: 'password' })
  @MaxLength(50)
  @MinLength(6)
  @IsString()
  password: User['password'];

  @ApiProperty({ example: 'Foo Bar' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  name: User['name'];

  @ApiProperty({
    example: {
      number: '1234567890123456',
      expDate: '12/24',
    },
  })
  @ValidateNested({ each: true })
  @Type(() => UserCartDto)
  card: UserCartDto;

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
  @IsNotEmpty()
  id: User['id'];

  @ApiProperty({ example: 'example@mail.com' })
  @MaxLength(50)
  @IsEmail()
  email: User['email'];

  @ApiProperty({ example: 'Foo Bar' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  name: User['name'];

  @ApiProperty({ example: 'User' })
  @IsString()
  @IsNotEmpty()
  role: User['role'];

  @ApiProperty({
    example: {
      number: '1234567890123456',
      expDate: '12/24',
    },
  })
  @ValidateNested({ each: true })
  @Type(() => UserCartDto)
  card: UserCartDto;

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
  @IsNotEmpty()
  id: User['id'];

  constructor(id: string) {
    this.id = id;
  }
}

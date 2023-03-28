import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'example@mail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @MaxLength(100)
  @MinLength(1)
  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

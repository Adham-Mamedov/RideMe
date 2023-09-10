import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'example@mail.com' })
  @MaxLength(50)
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password' })
  @MaxLength(50)
  @MinLength(6)
  @IsString()
  password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

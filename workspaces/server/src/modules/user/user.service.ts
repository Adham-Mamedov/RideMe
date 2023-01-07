import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import bcrypt from 'bcrypt';

import AppConfig from '@server/app.config';
import { exclude, excludeFromArray } from '@shared/utils/object.utils';

import { User } from '@prisma/client';
import { ErrorCodes, Role } from '@shared/enums';
import { CreateUserDto } from '@server/modules/user/dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>
  ) {}

  async getUsers() {
    try {
      const users = await this.prisma.user.findMany();
      return excludeFromArray<User, 'password' | 'refreshToken'>(users, [
        'password',
        'refreshToken',
      ]);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async getUserByEmail(email: string) {
    try {
      return this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new NotFoundException(ErrorCodes.UserNotFound);
    }
  }

  async createUser(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      userDto.password,
      this.appConfig.bcryptRounds
    );

    try {
      const user = await this.prisma.user.create({
        data: {
          ...userDto,
          password: hashedPassword,
          role: Role.User,
        },
      });
      return exclude<User, 'password' | 'refreshToken'>(user, [
        'password',
        'refreshToken',
      ]);
    } catch {
      throw new BadRequestException(ErrorCodes.UserAlreadyExists);
    }
  }

  async updateUserToken(dbUser: User, token: string) {
    const hashedToken = this.jwtService.sign(token, {
      secret: this.appConfig.jwtRefreshSecret,
    });
    const id = dbUser.id;
    delete dbUser.id;

    try {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...dbUser,
          refreshToken: hashedToken,
        },
      });
      return true;
    } catch {
      throw new InternalServerErrorException(ErrorCodes.FailedToRefreshToken);
    }
  }

  async dropUsers() {
    try {
      await this.prisma.user.deleteMany();
      return true;
    } catch {
      throw new InternalServerErrorException(ErrorCodes.InternalServerError);
    }
  }
}

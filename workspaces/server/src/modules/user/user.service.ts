import bcrypt from 'bcrypt';
import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'nestjs-prisma';
import { User, Role } from '@prisma/client';

import AppConfig from '@server/app.config';
import { exclude, excludeFromArray } from '@shared/utils/object.utils';

import { EErrorMessages } from '@shared/enums';
import { CreateUserDto } from '@server/modules/user/dto/user.dto';

@Injectable()
export class UserService implements OnModuleInit {
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
      Logger.error(error, 'UserService:getUsers');
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
      Logger.error(error, 'UserService:getUserByEmail');
      throw new NotFoundException(EErrorMessages.UserNotFound);
    }
  }

  async createUser(userDto: CreateUserDto, role: Role = Role.User) {
    try {
      const hashedPassword = await bcrypt.hash(
        userDto.password,
        this.appConfig.bcryptRounds
      );

      const user = await this.prisma.user.create({
        data: {
          ...userDto,
          password: hashedPassword,
          role,
        },
      });
      return exclude<User, 'password' | 'refreshToken'>(user, [
        'password',
        'refreshToken',
      ]);
    } catch (error) {
      Logger.warn(error, 'UserService:createUser');
      throw new BadRequestException(EErrorMessages.UserAlreadyExists);
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
      throw new InternalServerErrorException(
        EErrorMessages.FailedToRefreshToken
      );
    }
  }

  async dropUsers() {
    try {
      await this.prisma.user.deleteMany();
      return true;
    } catch (error) {
      Logger.error(error, 'UserService:dropUsers');
      throw new InternalServerErrorException(
        EErrorMessages.InternalServerError
      );
    }
  }

  async onModuleInit() {
    const users = await this.prisma.user.findMany();
    if (!users.length) {
      await this.createUser(
        {
          email: this.appConfig.defaultOwnerEmail,
          name: 'Adham Mamedov',
          password: '123456',
        },
        Role.Owner
      );
    }
  }
}

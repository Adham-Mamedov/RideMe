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
import { Role, User } from '@prisma/client';

import AppConfig from '@server/app.config';
import { exclude, excludeFromArray } from '@shared/utils/object.utils';

import { EErrorMessages } from '@shared/enums';
import {
  CreateUserDto,
  DeleteUserDto,
  EditUserDto,
} from '@server/modules/user/dto/user.dto';
import { hideCardNumber } from '@shared/utils/string.utils';

const defaultCard = {
  number: '1111222233334444',
  expDate: '12/24',
};

@Injectable()
export class UserService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    @Inject(AppConfig.KEY)
    private readonly appConfig: ConfigType<typeof AppConfig>
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      let users = await this.prisma.user.findMany();
      users = users.map((user) => {
        const decodedCardNumber = this.jwtService.decode(user.card.number);
        user.card.number = hideCardNumber(decodedCardNumber as string);
        return user;
      });
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

      const encryptedCardNumber = this.jwtService.sign(userDto.card.number, {
        secret: this.appConfig.jwtSecret,
      });
      const card = {
        number: encryptedCardNumber,
        expDate: userDto.card.expDate,
      };

      const user = await this.prisma.user.create({
        data: {
          ...userDto,
          password: hashedPassword,
          role,
          card,
        },
      });
      return exclude<User, 'password' | 'refreshToken'>(user, [
        'password',
        'refreshToken',
      ]);
    } catch (error) {
      Logger.warn(error, 'UserService:createUser');
      if (
        error.message.includes(
          'Unique constraint failed on the constraint: `users_email_key`'
        )
      ) {
        throw new BadRequestException(EErrorMessages.UserAlreadyExists);
      }
      throw new InternalServerErrorException();
    }
  }

  async updateUserToken(dbUser: User, token: string) {
    const hashedToken = this.jwtService.sign(token, {
      secret: this.appConfig.jwtRefreshSecret,
    });

    dbUser.card.number = this.jwtService.sign(dbUser.card.number, {
      secret: this.appConfig.jwtSecret,
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

  async editUser(userDto: EditUserDto) {
    try {
      const id = userDto.id;
      delete userDto.id;

      const dbUser = await this.prisma.user.findUnique({
        where: {
          id,
        },
      });
      delete dbUser.id;

      const userCardNumber = this.jwtService.decode(dbUser.card.number);
      const hiddenCardNumber = hideCardNumber(userCardNumber as string);

      if (userDto.card.number !== hiddenCardNumber.replace(/\s/g, '')) {
        userDto.card.number = this.jwtService.sign(userDto.card.number, {
          secret: this.appConfig.jwtSecret,
        });
      } else {
        userDto.card.number = dbUser.card.number;
      }

      const user = await this.prisma.user.update({
        where: {
          id,
        },
        data: { ...dbUser, ...userDto },
      });
      return exclude<User, 'password' | 'refreshToken'>(user, [
        'password',
        'refreshToken',
      ]);
    } catch (error) {
      Logger.error(error, 'UserService:editUser');
      if (
        error.message.includes(
          'Unique constraint failed on the constraint: `users_email_key`'
        )
      ) {
        throw new BadRequestException(EErrorMessages.UserAlreadyExists);
      }
      throw new InternalServerErrorException(EErrorMessages.EditUserFailed);
    }
  }

  async deleteUser(userDto: DeleteUserDto) {
    try {
      const id = userDto.id;
      delete userDto.id;
      const user = await this.prisma.user.delete({
        where: {
          id,
        },
      });
      return !!user;
    } catch (error) {
      Logger.error(error, 'UserService:deleteUser');
      throw new InternalServerErrorException(EErrorMessages.DeleteUserFailed);
    }
  }

  async dropUsers() {
    try {
      await this.prisma.user.deleteMany();
      return true;
    } catch (error) {
      Logger.error(error, 'UserService:dropUsers');
      throw new InternalServerErrorException(EErrorMessages.DropUsersFailed);
    }
  }

  async onModuleInit() {
    const users = await this.prisma.user.findMany();
    if (!users.length) {
      await this.createUser(
        {
          email: this.appConfig.defaultOwnerEmail,
          name: 'Adham Mamedov',
          password: this.appConfig.defaultOwnerPassword || '123456',
          card: defaultCard,
        },
        Role.Owner
      );
    }
  }
}

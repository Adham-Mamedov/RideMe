import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Comment } from '@prisma/client';

import {
  CreateCommentDto,
  DeleteCommentDto,
  EditCommentDto,
} from '@server/modules/comment/dto/comment.dto';
import { EErrorMessages } from '@shared/enums';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<Comment[]> {
    try {
      return this.prisma.comment.findMany();
    } catch (error) {
      Logger.error(error, 'CommentService:getAll');
      throw new NotFoundException();
    }
  }

  async getById(id: string): Promise<Comment> {
    try {
      return this.prisma.comment.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      Logger.error(error, 'CommentService:getById');
      throw new NotFoundException(EErrorMessages.CommentNotFound);
    }
  }

  async create(data: CreateCommentDto): Promise<Comment> {
    try {
      return this.prisma.comment.create({
        data,
      });
    } catch (error) {
      Logger.error(error, 'CommentService:create');
      throw new InternalServerErrorException(
        EErrorMessages.CreateCommentFailed
      );
    }
  }

  async edit(data: EditCommentDto): Promise<Comment> {
    try {
      const id = data.id;

      const comment = await this.getById(id);
      delete comment.id;

      return this.prisma.comment.update({
        where: {
          id,
        },
        data: {
          ...comment,
          text: data.text,
        },
      });
    } catch (error) {
      Logger.error(error, 'CommentService:edit');
      throw new InternalServerErrorException(EErrorMessages.EditCommentFailed);
    }
  }

  async delete({ id }: DeleteCommentDto): Promise<boolean> {
    try {
      await this.prisma.comment.delete({
        where: {
          id,
        },
      });
      return true;
    } catch (error) {
      Logger.error(error, 'CommentService:delete');
      throw new InternalServerErrorException(
        EErrorMessages.DeleteCommentFailed
      );
    }
  }
}

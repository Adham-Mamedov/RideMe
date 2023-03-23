import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CommentController } from '@server/modules/comment/comment.controller';
import { CommentService } from '@server/modules/comment/comment.service';

@Module({
  controllers: [CommentController],
  providers: [PrismaService, CommentService],
  exports: [CommentService],
})
export class CommentModule {}

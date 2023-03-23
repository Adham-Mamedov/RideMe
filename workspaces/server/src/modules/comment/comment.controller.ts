import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

import { CommentService } from '@server/modules/comment/comment.service';
import RoleGuard from '@server/common/guards/role.guard';

import {
  CreateCommentDto,
  DeleteCommentDto,
  EditCommentDto,
} from '@server/modules/comment/dto/comment.dto';
import { CommentEntity } from '@server/modules/comment/entities/comment.entity';
import { ERoute } from '@shared/enums';

@Controller(ERoute.Comments)
@ApiTags('Comment Controller')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOkResponse({ type: CommentEntity, isArray: true })
  @UseGuards(RoleGuard(Role.Admin))
  async getAll() {
    return this.commentService.getAll();
  }

  @Get('/:id')
  @ApiOkResponse({ type: CommentEntity, isArray: true })
  @UseGuards(RoleGuard(Role.Admin))
  async getById(@Param('id') id: string) {
    return this.commentService.getById(id);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CommentEntity })
  @UseGuards(RoleGuard(Role.User))
  async createStation(@Body() dto: CreateCommentDto) {
    return this.commentService.create(dto);
  }

  @Put('edit')
  @ApiCreatedResponse({ type: CommentEntity })
  @UseGuards(RoleGuard(Role.Admin))
  async editStation(@Body() dto: EditCommentDto) {
    return this.commentService.edit(dto);
  }

  @Delete('delete')
  @ApiOkResponse({ type: Boolean })
  @UseGuards(RoleGuard(Role.Admin))
  async deleteStation(@Body() dto: DeleteCommentDto) {
    return this.commentService.delete(dto);
  }
}

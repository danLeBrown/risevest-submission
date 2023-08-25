import { Body, Get, Post, Route } from 'tsoa';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Route('comments')
export class CommentsController {
  constructor(private readonly commentsService = new CommentsService()) {}

  @Post('')
  public async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<{ data: CommentDto }> {
    const data = await this.commentsService.create(createCommentDto);

    return { data: CommentDto.fromEntity(data) };
  }

  @Get('/')
  public async findAll(): Promise<{ data: CommentDto[] }> {
    const data = await this.commentsService.findAll();

    return { data: CommentDto.collection(data) };
  }

  @Get('/{id}')
  public async findById(id: number): Promise<{ data: CommentDto }> {
    const data = await this.commentsService.findOneByOrFail({ id });

    return { data: CommentDto.fromEntity(data) };
  }
}
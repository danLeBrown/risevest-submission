import { Body, Get, Middlewares, Post, Route } from 'tsoa';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { TokenAuthentication } from '../../middlewares/token-authentication';

@Route('comments')
@Middlewares(TokenAuthentication)
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
  public async findBy(): Promise<{ data: CommentDto[] }> {
    const data = await this.commentsService.findBy();

    return { data: CommentDto.collection(data) };
  }

  @Get('/{id}')
  public async findById(id: number): Promise<{ data: CommentDto }> {
    const data = await this.commentsService.findOneByOrFail({ id });

    return { data: CommentDto.fromEntity(data) };
  }
}

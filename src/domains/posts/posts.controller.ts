import { Body, Get, Path, Post, Queries, Route } from 'tsoa';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CommentDto } from '../comments/dto/comment.dto';
import { QueryPostDto } from './dto/query-post.dto';

@Route('posts')
export class PostsController {
  constructor(private readonly postsService = new PostsService()) {}

  @Post('/')
  public async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ data: PostDto }> {
    const data = await this.postsService.create(createPostDto);

    return { data: PostDto.fromEntity(data) };
  }

  @Post('/{id}/comments')
  public async createComment(
    @Path() id: number,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<{ data: CommentDto }> {
    const data = await this.postsService.createComment(id, createCommentDto);

    return { data: CommentDto.fromEntity(data) };
  }

  @Get('/')
  public async findAll(
    @Queries() query?: QueryPostDto,
  ): Promise<{ data: PostDto[] }> {
    const data = await this.postsService.findBy(query);

    return { data: PostDto.collection(data) };
  }

  @Get('/{id}')
  public async findById(id: number): Promise<{ data: PostDto }> {
    const data = await this.postsService.findOneByOrFail({ id });

    return { data: PostDto.fromEntity(data) };
  }
}

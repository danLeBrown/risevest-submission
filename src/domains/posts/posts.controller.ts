import { Body, Get, Post, Route } from 'tsoa';
import { PostsService } from './posts.service';
import { PostDto } from './dto/post.dto';
import { CreatePostDto } from './dto/create-post.dto';

@Route('posts')
export class PostsController {
  constructor(private readonly postsService = new PostsService()) {}

  @Post('')
  public async create(
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ data: PostDto }> {
    const data = await this.postsService.create(createPostDto);

    return { data: PostDto.fromEntity(data) };
  }

  @Get('/')
  public async findAll(): Promise<{ data: PostDto[] }> {
    const data = await this.postsService.findAll();

    return { data: PostDto.collection(data) };
  }

  @Get('/{id}')
  public async findById(id: number): Promise<{ data: PostDto }> {
    const data = await this.postsService.findOneByOrFail({ id });

    return { data: PostDto.fromEntity(data) };
  }
}

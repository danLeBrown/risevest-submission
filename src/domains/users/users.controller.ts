import { Body, Get, Middlewares, Path, Post, Route } from 'tsoa';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PostDto } from '../posts/dto/post.dto';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { TokenAuthentication } from '../../middlewares/token-authentication';
import { TopUserDto } from './dto/top-user.dto';

@Route('users')
export class UsersController {
  constructor(private readonly usersService = new UsersService()) {}

  @Post('')
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ data: AuthUserDto }> {
    const data = await this.usersService.create(createUserDto);

    return { data: AuthUserDto.fromEntity(data) };
  }

  @Post('/{id}/posts')
  @Middlewares(TokenAuthentication)
  public async createUserPost(
    @Path() id: number,
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ data: PostDto }> {
    const data = await this.usersService.createUserPost(id, createPostDto);

    return { data: PostDto.fromEntity(data) };
  }

  @Get('/')
  @Middlewares(TokenAuthentication)
  public async findBy(): Promise<{ data: UserDto[] }> {
    const data = await this.usersService.findBy();

    return { data: UserDto.collection(data) };
  }

  @Get('leader-board')
  @Middlewares(TokenAuthentication)
  public async findTopUsers(): Promise<{ data: TopUserDto[] }> {
    const data = await this.usersService.findTopUsers();

    return { data: TopUserDto.collection(data) };
  }

  @Get('/{id}')
  @Middlewares(TokenAuthentication)
  public async findById(id: number): Promise<{ data: UserDto }> {
    const data = await this.usersService.findOneByOrFail({ id });

    return { data: UserDto.fromEntity(data) };
  }

  @Get('/{id}/posts')
  @Middlewares(TokenAuthentication)
  public async findUserPosts(@Path() id: number): Promise<{ data: PostDto[] }> {
    const data = await this.usersService.findUserPosts(id);

    return { data: PostDto.collection(data) };
  }
}

import { Body, Get, Path, Post, Route } from 'tsoa';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PostDto } from '../posts/dto/post.dto';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { AuthUserDto } from './dto/auth-user.dto';

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
  public async createUserPost(
    @Path() id: number,
    @Body() createPostDto: CreatePostDto,
  ): Promise<{ data: PostDto[] }> {
    const data = await this.usersService.createUserPost(id, createPostDto);

    return { data: PostDto.collection(data) };
  }

  @Get('/')
  public async findBy(): Promise<{ data: UserDto[] }> {
    const data = await this.usersService.findBy();

    return { data: UserDto.collection(data) };
  }

  @Get('leader-board')
  public async findTopUsers() {
    const data = await this.usersService.findTopUsers();

    return { data };
  }

  @Get('/{id}')
  public async findById(id: number): Promise<{ data: UserDto }> {
    const data = await this.usersService.findOneByOrFail({ id });

    return { data: UserDto.fromEntity(data) };
  }
}

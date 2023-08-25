import { Body, Get, Post, Route } from 'tsoa';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { PostDto } from '../posts/dto/post.dto';

@Route('users')
export class UsersController {
  constructor(private readonly usersService = new UsersService()) {}

  @Post('')
  public async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ data: UserDto }> {
    const data = await this.usersService.create(createUserDto);

    return { data: UserDto.fromEntity(data) };
  }

  @Get('/')
  public async findAll(): Promise<{ data: UserDto[] }> {
    const data = await this.usersService.findAll();

    return { data: UserDto.collection(data) };
  }

  @Get('/{id}')
  public async findById(id: number): Promise<{ data: UserDto }> {
    const data = await this.usersService.findOneByOrFail({ id });

    return { data: UserDto.fromEntity(data) };
  }

  @Get('/{id}/posts')
  public async findPostsByUserId(id: number): Promise<{ data: PostDto[] }> {
    const data = await this.usersService.findUserPosts(id);

    return { data: PostDto.collection(data) };
  }
}

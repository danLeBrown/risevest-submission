import { FindOptionsWhere, Repository } from 'typeorm';
import { AppDataSource } from '../../config/typeorm.config';
import { User } from './entity/user.enity';
import { CreateUserDto } from './dto/create-user.dto';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entity/post';
import { NotFoundException } from '../../exceptions/not-found-exception';

export class UsersService {
  constructor(
    private readonly userRepo: Repository<User> = AppDataSource.getRepository(
      User,
    ),
    private readonly postsService = new PostsService(),
  ) {}

  findAll() {
    return this.userRepo.find();
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return this.userRepo.save(user);
  }

  async findOneByOrFail(where: FindOptionsWhere<User>) {
    const user = await this.userRepo.findOne({ where });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserPosts(id: number): Promise<Post[]> {
    const user = await this.findOneByOrFail({ id });

    return this.postsService.findBy({ user_id: user.id });
  }
}

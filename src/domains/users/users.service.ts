import { FindOptionsWhere, Repository } from 'typeorm';
import { AppDataSource } from '../../config/typeorm.config';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entity/post.entity';
import { NotFoundException } from '../../exceptions/not-found-exception';

export class UsersService {
  constructor(
    private readonly userRepo: Repository<User> = AppDataSource.getRepository<User>(
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

  async findTopUsers(): Promise<User[]> {
    return this.userRepo
      .createQueryBuilder('u')
      .select('u.*')
      .addSelect('count(DISTINCT p.id)', 'post_count')
      .addSelect('user_comments.content', 'last_comment')
      .leftJoin(Post, 'p', 'u.id = p.user_id')
      .leftJoin(
        (qb) =>
          qb
            .select('c.*')
            .from('comments', 'c')
            .groupBy('c.id, c.user_id')
            .orderBy('c.created_at')
            .limit(1),
        'user_comments',
        'u.id = user_comments.user_id',
      )
      .groupBy('u.id, user_comments.content')
      .orderBy('post_count', 'DESC')
      .limit(3)
      .getRawMany();

    // return this.userRepo.create(rawData);
  }
}

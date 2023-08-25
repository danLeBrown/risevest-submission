import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entity/post.entity';
import { NotFoundException } from '../../exceptions/not-found-exception';
import { getRepository } from '../../utils/data-source-manager';
import { CreatePostDto } from '../posts/dto/create-post.dto';

export class UsersService {
  constructor(
    private readonly userRepo: Repository<User> = getRepository<User>(User),
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

  async createUserPost(
    id: number,
    createPostDto: CreatePostDto,
  ): Promise<Post[]> {
    const user = await this.findOneByOrFail({ id });

    const post = await this.postsService.create(createPostDto);

    return this.postsService.findBy({ user_id: user.id });
  }

  async findTopUsers(): Promise<User[]> {
    return this.userRepo
      .createQueryBuilder('u')
      .select('u.*')
      .addSelect('count(DISTINCT p.id)', 'total_posts')
      .addSelect('user_comments.content', 'latest_comment')
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
      .orderBy('total_posts', 'DESC')
      .limit(3)
      .getRawMany();

    // return this.userRepo.create(rawData);
  }
}

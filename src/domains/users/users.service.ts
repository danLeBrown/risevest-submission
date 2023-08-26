import { FindOptionsWhere, Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entity/post.entity';
import { getRepository } from '../../utils/data-source-manager';
import { CreatePostDto } from '../posts/dto/create-post.dto';
import { NotFoundException } from '../../http-exceptions';

export class UsersService {
  constructor(
    private readonly userRepo: Repository<User> = getRepository<User>(User),
    private readonly postsService = new PostsService(),
  ) {}

  findBy(where?: FindOptionsWhere<User>) {
    return this.userRepo.find({ where });
  }

  async create(createUserDto: CreateUserDto) {
    const token = Math.random().toString(36).substr(2);

    let user = this.userRepo.create({ name: createUserDto.name, hash: token });

    user = await this.userRepo.save(user);

    user.token = `${user.id}.${token}`;

    return user;
  }

  async findOneBy(where: FindOptionsWhere<User>) {
    return this.userRepo.findOne({ where });
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
  ): Promise<Post> {
    const user = await this.findOneByOrFail({ id });

    return this.postsService.create(createPostDto);
  }

  async findUserPosts(id: number): Promise<Post[]> {
    const user = await this.findOneByOrFail({ id });

    return this.postsService.findBy({ user_id: user.id });
  }

  async findTopUsers(): Promise<
    Array<User & { total_posts: number; latest_comment: string }>
  > {
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
      .having('count(DISTINCT p.id) > 0')
      .andHaving('user_comments.content IS NOT NULL')
      .orderBy('count(DISTINCT p.id)', 'DESC')
      .limit(3)
      .getRawMany();

    // return this.userRepo.create(rawData);
  }
}

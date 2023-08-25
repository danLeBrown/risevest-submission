import { AppDataSource } from '../../config/typeorm.config';
import { Post } from './entity/post';
import { CreatePostDto } from './dto/create-post.dto';
import { FindOptionsWhere } from 'typeorm';

export class PostsService {
  constructor(
    private readonly postRepository = AppDataSource.getRepository(Post),
  ) {}

  findAll() {
    return this.postRepository.find();
  }

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findOneByOrFail(where: FindOptionsWhere<Post>) {
    const post = await this.postRepository.findOne({ where });

    if (!post) {
      throw new Error('Post not found');
    }

    return post;
  }
}

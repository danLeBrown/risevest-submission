import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { FindOptionsWhere } from 'typeorm';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';
import { CommentsService } from '../comments/comments.service';
import { NotFoundException } from '../../exceptions/not-found-exception';
import { getRepository } from '../../utils/data-source-manager';

export class PostsService {
  constructor(
    private readonly postRepository = getRepository<Post>(Post),
    private readonly commentsService = new CommentsService(),
  ) {}

  create(createPostDto: CreatePostDto) {
    const post = this.postRepository.create(createPostDto);
    return this.postRepository.save(post);
  }

  async findOneByOrFail(where: FindOptionsWhere<Post>) {
    const post = await this.postRepository.findOne({
      where,
      relations: { user: true },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async findBy(where?: FindOptionsWhere<Post>) {
    return this.postRepository.find({ where, relations: { user: true } });
  }

  async createComment(id: number, createCommentDto: CreateCommentDto) {
    const post = await this.findOneByOrFail({ id });

    return this.commentsService.create(createCommentDto);
  }
}

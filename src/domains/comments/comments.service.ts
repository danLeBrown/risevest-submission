import { FindOptionsWhere } from 'typeorm';
import { AppDataSource } from '../../config/typeorm.config';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';

export class CommentsService {
  constructor(
    private readonly commentRepo = AppDataSource.getRepository(Comment),
  ) {}

  findAll() {
    return this.commentRepo.find();
  }

  create(createCommentDto: CreateCommentDto) {
    const comment = this.commentRepo.create(createCommentDto);
    return this.commentRepo.save(comment);
  }

  async findOneByOrFail(where: FindOptionsWhere<Comment>) {
    const comment = await this.commentRepo.findOne({ where });

    if (!comment) {
      throw new Error('Comment not found');
    }

    return comment;
  }
}

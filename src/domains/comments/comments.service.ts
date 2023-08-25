import { FindOptionsWhere } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entity/comment.entity';
import { getRepository } from '../../utils/data-source-manager';

export class CommentsService {
  constructor(private readonly commentRepo = getRepository<Comment>(Comment)) {}

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

  async findBy(where?: FindOptionsWhere<Comment>) {
    return this.commentRepo.find({ where, relations: { post: true } });
  }
}

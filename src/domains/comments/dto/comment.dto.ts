import { BaseDto } from '../../../common/dto/base-dto';
import { Comment } from '../entity/comment.entity';

export class CommentDto extends BaseDto {
  id: number;
  content: string;
  post_id: number;

  constructor(comment: Comment) {
    super(comment);
    this.id = comment.id;
    this.content = comment.content;
    this.post_id = comment.post_id;
  }

  static fromEntity(entity: Comment): CommentDto {
    return new CommentDto(entity);
  }

  static collection(entities: Comment[]): CommentDto[] {
    return entities.map((entity) => CommentDto.fromEntity(entity));
  }
}

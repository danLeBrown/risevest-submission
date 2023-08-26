import { BaseDto } from '../../../common/dto/base-dto';
import { PostDto } from '../../posts/dto/post.dto';
import { UserDto } from '../../users/dto/user.dto';
import { Comment } from '../entity/comment.entity';

export class CommentDto extends BaseDto {
  id: number;
  content: string;
  post_id: number;
  user_id: number;
  user?: UserDto;
  post?: PostDto;

  constructor(comment: Comment) {
    super(comment);
    this.id = comment.id;
    this.content = comment.content;
    this.post_id = comment.post_id;
    this.user_id = comment.user_id;

    if (comment.user) {
      this.user = UserDto.fromEntity(comment.user);
    }

    if (comment.post) {
      this.post = PostDto.fromEntity(comment.post);
    }
  }

  static fromEntity(entity: Comment): CommentDto {
    return new CommentDto(entity);
  }

  static collection(entities: Comment[]): CommentDto[] {
    return entities.map((entity) => CommentDto.fromEntity(entity));
  }
}

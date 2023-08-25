import { UserDto } from '../../users/dto/user.dto';
import { Post } from '../entity/post.entity';
import { BaseDto } from '../../../common/dto/base-dto';

export class PostDto extends BaseDto {
  id: number;
  user_id: number;
  title: string;
  content: string;
  user?: UserDto;

  constructor(post: Post) {
    super(post);
    this.id = post.id;
    this.user_id = post.user_id;
    this.title = post.title;
    this.content = post.content;

    if (post.user) {
      this.user = UserDto.fromEntity(post.user);
    }
  }

  static fromEntity(entity: Post): PostDto {
    return new PostDto(entity);
  }

  static collection(entities: Post[]): PostDto[] {
    return entities.map((entity) => PostDto.fromEntity(entity));
  }
}

import { User } from '../entity/user.entity';
import { UserDto } from './user.dto';

export class TopUserDto extends UserDto {
  total_posts: number;
  latest_comment: string;

  constructor(user: User & { total_posts: number; latest_comment: string }) {
    super(user);

    this.total_posts = Number(user.total_posts);
    this.latest_comment = user.latest_comment;
  }

  static fromEntity(
    entity: User & { total_posts: number; latest_comment: string },
  ): TopUserDto {
    return new TopUserDto(entity);
  }

  static collection(
    entities: Array<User & { total_posts: number; latest_comment: string }>,
  ): TopUserDto[] {
    return entities.map((entity) => TopUserDto.fromEntity(entity));
  }
}

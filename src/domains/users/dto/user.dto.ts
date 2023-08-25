import { PostDto } from '../../posts/dto/post.dto';
import { User } from '../entity/user.enity';

export class UserDto {
  id: number;
  name: string;
  posts?: PostDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;

    if (user.posts) {
      this.posts = PostDto.collection(user.posts);
    }
  }

  static fromEntity(entity: User): UserDto {
    return new UserDto(entity);
  }

  static collection(entities: User[]): UserDto[] {
    return entities.map((entity) => UserDto.fromEntity(entity));
  }
}

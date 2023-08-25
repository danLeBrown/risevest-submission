import { CommentDto } from '../../comments/dto/comment.dto';
import { User } from '../entity/user.entity';
import { UserDto } from './user.dto';

export class TopUserDto extends UserDto {
  comment: CommentDto;

  constructor(user: User) {
    super(user);

    // this.comment = {
    //     id: user.comments.id,
    // }
    // const comment = new CommentDto()
  }
}

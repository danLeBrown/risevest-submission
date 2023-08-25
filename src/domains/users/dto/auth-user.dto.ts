import { User } from '../entity/user.entity';
import { UserDto } from './user.dto';

export class AuthUserDto {
  user: UserDto;
  token: string;

  constructor(user: User) {
    this.user = UserDto.fromEntity(user);
    this.token = user.token;
  }

  static fromEntity(entity: User): AuthUserDto {
    return new AuthUserDto(entity);
  }
}

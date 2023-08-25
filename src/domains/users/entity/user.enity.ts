import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base-entity';
import { Post } from '../../posts/entity/post';
import { Comment } from '../../comments/entity/comment.entity';
import { BaseDto } from '../../../common/dto/base-dto';

@Entity({
  name: 'users',
})
export class User extends BaseEntity<BaseDto> {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  comments?: Comment[];
}

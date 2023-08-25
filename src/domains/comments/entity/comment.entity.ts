import { BaseEntity } from '../../../common/entity/base-entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Post } from '../../posts/entity/post';
import { User } from '../../users/entity/user.enity';
import { BaseDto } from '../../../common/dto/base-dto';

@Entity()
export class Comment extends BaseEntity<BaseDto> {
  @Column({ type: 'varchar', length: 255 })
  content: string;

  @Column({ type: 'int' })
  post_id: number;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => Post, (post) => post.comments)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  post?: Post;

  @ManyToOne(() => User, (user) => user.comments)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;
}

import { BaseEntity } from '../../../common/entity/base-entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from '../../users/entity/user.entity';
import { Comment } from '../../comments/entity/comment.entity';

@Entity({
  name: 'posts',
})
export class Post extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  user_id: number;

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id' })
  comments?: Comment[];
}

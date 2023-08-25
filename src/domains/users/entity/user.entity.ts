import { BeforeInsert, Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entity/base-entity';
import { Post } from '../../posts/entity/post.entity';
import { Comment } from '../../comments/entity/comment.entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  token: string;

  @OneToMany(() => Post, (post) => post.user)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  posts?: Post[];

  @OneToMany(() => Comment, (comment) => comment)
  @JoinColumn({ name: 'id', referencedColumnName: 'user_id' })
  comments?: Comment[];

  @BeforeInsert()
  generateToken() {
    this.token = Math.random().toString(36).substr(2);
  }
}

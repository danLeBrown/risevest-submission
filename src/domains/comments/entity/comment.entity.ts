import { BaseEntity } from '../../../config/entity/base-entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Comment extends BaseEntity {
  @Column()
  content: string;

  @Column()
  post_id: number;
}

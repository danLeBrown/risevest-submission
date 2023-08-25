import { BaseEntity } from '../../../config/entity/base-entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'posts',
})
export class Post extends BaseEntity {
  constructor() {
    super();
  }

  @Column({ type: 'varchar', length: 100 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  user_id: number;
}

import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../config/entity/base-entity';

@Entity({
  name: 'users',
})
export class User extends BaseEntity {
  constructor() {
    super();
  }

  @Column({ type: 'varchar', length: 100 })
  name: string;
}

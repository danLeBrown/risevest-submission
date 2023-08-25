import { BaseEntity } from '../entity/base-entity';

export class BaseDto {
  id: number;
  created_at: number;
  updated_at: number;

  constructor(entity: BaseEntity) {
    this.id = entity.id;
    this.created_at = entity.created_at;
    this.updated_at = entity.updated_at;
  }
}

import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity<BaseDto> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: number;

  // private dtoClass?: Constructor<DTO, [BaseEntity, O?]>;

  // constructor() {}

  // toDto(): BaseDto {
}

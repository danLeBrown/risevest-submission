import { getUnixTime } from 'date-fns';
import {
  BeforeInsert,
  BeforeUpdate,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'int' })
  created_at: number;

  @UpdateDateColumn({ type: 'int' })
  updated_at: number;

  @BeforeInsert()
  insertCreatedAt() {
    this.created_at = getUnixTime(new Date());
    this.updated_at = getUnixTime(new Date());
  }

  @BeforeUpdate()
  updateUpdatedAt() {
    this.updated_at = getUnixTime(new Date());
  }
}

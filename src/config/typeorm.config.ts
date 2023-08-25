import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { Comment } from '../domains/comments/entity/comment.entity';
import { Post } from '../domains/posts/entity/post';
import { User } from '../domains/users/entity/user.enity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [User, Post, Comment],
  // entities: ['../domains/**/*entity/*{.js,.ts}'],
  subscribers: [],
  migrations: ['../database/migrations/*{.ts,.js}'],
});

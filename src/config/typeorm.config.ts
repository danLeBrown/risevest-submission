import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // synchronize: true,
  logging: true,
  // entities: [User, Post, Comment],
  entities: [__dirname + '/../domains/**/*.entity{.js,.ts}'],
  subscribers: [],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});

export const TestDataSource = new DataSource({
  type: 'sqlite',
  database: process.env.SQLITE_DB ?? __dirname + '/../../sqlite.db',
  synchronize: true,
  dropSchema: true,
  entities: [__dirname + '/../domains/**/*.entity{.js,.ts}'],
  subscribers: [],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});

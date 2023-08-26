import { DataSource } from 'typeorm';

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

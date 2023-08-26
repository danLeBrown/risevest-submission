import { DataSource } from 'typeorm';

export const TestDataSource = new DataSource({
  type: 'sqlite',
  database: __dirname + `/../../ ${process.env.SQLITE_DB ?? 'sqlite.db'}`,
  synchronize: true,
  logging: false,
  dropSchema: true,
  entities: [__dirname + '/../domains/**/*.entity{.js,.ts}'],
  subscribers: [],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  migrationsTableName: 'migrations',
});

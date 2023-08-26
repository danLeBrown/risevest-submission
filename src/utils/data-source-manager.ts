import { EntityTarget, ObjectLiteral, Repository } from 'typeorm';

import { config } from 'dotenv';
import { AppDataSource } from '../config/typeorm.config';
import { TestDataSource } from '../config/test-typeorm.config';

config();

export const getDataSource = () => {
  const environment = process.env.NODE_ENV ?? 'local';
  return environment === 'test' ? TestDataSource : AppDataSource;
};

export const getRepository = <T extends ObjectLiteral>(
  entity: EntityTarget<T>,
): Repository<T> => {
  const environment = process.env.NODE_ENV ?? 'local';
  return environment === 'test'
    ? TestDataSource.manager.getRepository(entity)
    : AppDataSource.manager.getRepository(entity);
};

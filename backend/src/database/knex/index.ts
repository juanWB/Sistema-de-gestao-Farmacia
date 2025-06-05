import knex from 'knex';
import { development, production, test } from './Enviroment';

const getEnviroment = () => {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return 'development';
    case 'test':
      return 'test';
    case 'prod':
      return 'production';

    default:
        return 'development'
  }
};

export const Knex = knex(getEnviroment());

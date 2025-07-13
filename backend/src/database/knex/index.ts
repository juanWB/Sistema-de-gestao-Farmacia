import knex from 'knex';
import { development, production, test } from './Enviroment';
import "dotenv/config";
import pg from "pg";

if(process.env.NODE_ENV === 'production'){
  pg.types.setTypeParser(20, 'text', parseInt);
} 

const getEnviroment = () => {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return development;
    case 'test':
      return test;
    case 'production':
      return production;

    default:
        return development
  }
};

export const Knex = knex(getEnviroment());

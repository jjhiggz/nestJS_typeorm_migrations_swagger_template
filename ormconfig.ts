import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import path from 'path';

import * as dotenv from 'dotenv';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [path.join(__dirname, '**', '*entity{.ts,.js}')],
  migrations: ['dist/src/db/migrations/*js'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  synchronize: false,
};

export default config;

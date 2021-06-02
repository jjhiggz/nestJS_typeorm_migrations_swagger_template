import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import * as dotenv from 'dotenv';
dotenv.config();

const config: PostgresConnectionOptions = {
  type: 'postgres',
  port: +process.env.POSTGRES_PORT, // Port name
  database: process.env.POSTGRES_DB, // Db name
  username: process.env.POSTGRES_USER, // username
  password: process.env.POSTGRES_PASSWORD,
  entities: ['dist/src/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/db/migrations/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  synchronize: false,
};

export default config;

import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const databaseConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

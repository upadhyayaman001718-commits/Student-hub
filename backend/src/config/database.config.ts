import { config } from './env.config';

export const databaseConfig = {
  url: config.databaseUrl,
  maxConnections: 10,
  idleTimeoutMillis: 30000,
};

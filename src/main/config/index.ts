import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PREFIX: string;
  MAJOR_VERSION: string;
  PORT: number;
  NODE_ENV: string;
}

export const config: Config = {
  PORT: parseInt(process.env.PORT || '4000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  PREFIX: process.env.PREFIX || 'api',
  MAJOR_VERSION: process.env.MAJOR_VERSION || 'v1',
};

export const buildBaseRoute = (): string => {
  return `/${config.PREFIX}/${config.MAJOR_VERSION}`;
};

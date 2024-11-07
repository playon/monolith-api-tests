import process from 'process';
import { ENVS, isEnv, TEnvironment } from '../types/config.type';

export const getEnv = (): TEnvironment => {
  const env = process.env.ENV;
  if (!isEnv(env)) {
    throw new Error(
      `Invalid environment. Received: ${env}, when expected one of: ${ENVS.join(', ')}`,
    );
  }
  return env as TEnvironment;
};

export const getAuthToken = (): string => {
  const token = process.env.AUTH_TOKEN;
  if (!token) {
    throw new Error('No auth token found');
  }
  return token;
};

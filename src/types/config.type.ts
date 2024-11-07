export const ENVS = ['QA1', 'local', 'staging'] as const;
export type TEnvironment = (typeof ENVS)[number];

export function isEnv(env: unknown): env is TEnvironment {
  if (isString(env)) {
    return ENVS.includes(env as TEnvironment);
  }
  throw new Error('Environment is not set');
}

function isString(env: unknown): env is string {
  return typeof env === 'string';
}

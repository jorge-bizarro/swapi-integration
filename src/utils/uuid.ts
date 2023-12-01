import {randomUUID} from 'node:crypto';

export const generateRandomUuid = (): string => {
  return randomUUID();
};

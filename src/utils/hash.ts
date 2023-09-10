import * as crypto from 'node:crypto';

const hash = (text: string): string => {
  const salt = crypto.randomBytes(16).toString('hex');

  const hashedText = crypto
    .pbkdf2Sync(text, salt, 1000, 64, 'sha512')
    .toString('hex');

  return `${salt}:${hashedText}`;
};

const compare = (text: string, hash: string): boolean => {
  const [salt, key] = hash.split(':');

  const keyMatch = crypto
    .pbkdf2Sync(text, salt, 1000, 64, 'sha512')
    .toString('hex');

  return key === keyMatch;
};

export { hash, compare };

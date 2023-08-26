import { hashSync, compare } from 'bcryptjs';

export const hash = (password: string) => {
  return hashSync(password, 10);
};

export const compareHash = async (password: string, hash: string) => {
  return await compare(password, hash);
};

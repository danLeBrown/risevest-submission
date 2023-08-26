import bcrypt from 'bcrypt';

export const hash = async (password: string) => {
  return bcrypt.hash(password, 10);
};

export const compareHash = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

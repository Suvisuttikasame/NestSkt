import * as bcrypt from 'bcrypt';
import 'dotenv/config';

export async function hashPassword(password: string): Promise<string> {
  const saltOrRounds = process.env.SALTORROUNDS;
  const hash = await bcrypt.hash(password, +saltOrRounds);

  return hash;
}

export async function comparePassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

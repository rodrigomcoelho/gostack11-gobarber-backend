import { hash, compare } from 'bcryptjs';
import IHashProvider from '../models/IHashProvider';

class BCryptHashProvider implements IHashProvider {
  public async generateHash(payload: string): Promise<string> {
    const result = await hash(payload, 8);
    return result;
  }

  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    const result = await compare(payload, hashed);
    return result;
  }
}

export default BCryptHashProvider;

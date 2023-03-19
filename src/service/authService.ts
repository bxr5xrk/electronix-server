import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '../db/models/user';
import { query } from '../db';
import { config } from '../config';

class AuthService {
  login = async (email: string, password: string): Promise<string> => {
    const result = await query<User>('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);
    const user = result.rows[0];
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }
    const token = sign({ id: user.id, role: user.role }, config.JWT_SECRET);
    return token;
  };

  register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const result = await query<User>('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);

    const user = result.rows[0];
    if (user) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, 10);

    await query<User>(
      'INSERT INTO "user" (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, 'client']
    );
  };
}

export default new AuthService();

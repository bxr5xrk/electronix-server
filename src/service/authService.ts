import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Role, User } from '../db/models/user';
import { query } from '../db';
import { config } from '../config';

class AuthService {
  login = async (
    email: string,
    password: string
  ): Promise<{ token: string; name: string; email: string; role: Role }> => {
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

    return { token, name: user.name, email: user.email, role: user.role };
  };

  register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ token: string; name: string; email: string; role: Role }> => {
    const user = await query<User>('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);

    const findUser = user.rows[0];

    if (findUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await hash(password, 10);

    await query<User>(
      'INSERT INTO "user" (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, 'client']
    );

    const newUser = await query<User>('SELECT * FROM "user" WHERE email = $1', [
      email,
    ]);

    // Generate a JSON Web Token (JWT) with the user ID and role
    const token = sign(
      { id: newUser.rows[0].id, email, role: 'client' },
      config.JWT_SECRET
    );

    // Return the JWT, along with the user's name, email, and role
    return { token, name, email, role: 'client' };
  };
}

export default new AuthService();

import { hash } from 'bcrypt';
import { query } from '../db';
import { Role, User } from '../db/models/user';

class UserService {
  createUser = async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    const hashedPassword = await hash(password, 10);
    const role: Role = 'client';

    const queryResult = await query<User>(
      'INSERT INTO "user" (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING id, role',
      [name, email, hashedPassword, role]
    );

    return queryResult.rows[0];
  };

  getUsers = async (): Promise<User[]> => {
    const queryResult = await query<User>(
      'SELECT id, name, email, role FROM "user" where role != \'admin\''
    );
    return queryResult.rows;
  };

  getUserById = async (id: number): Promise<User> => {
    const queryResult = await query<User>(
      'SELECT * FROM "user" where id = $1',
      [id]
    );
    return queryResult.rows[0];
  };

  updateUserRole = async (id: number, role: Role): Promise<void> => {
    await query<User>('UPDATE "user" SET role = $1 WHERE id = $2', [role, id]);
  };
}

export default new UserService();

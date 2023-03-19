import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { Role } from '../db/models/user';
import UserService from '../service/userService';

class UserController {
  createUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.createUser(name, email, password);
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        config.JWT_SECRET
      );

      return res
        .status(201)
        .json({ message: 'User created', userId: user.id, token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  getUsers = async (_: Request, res: Response): Promise<Response> => {
    try {
      const users = await UserService.getUsers();
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  updateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const { role } = req.body;

      // Check if the user being modified exists
      const user = await UserService.getUserById(Number(id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Update the user's role
      await UserService.updateUserRole(Number(id), role as Role);

      return res
        .status(200)
        .json({ message: 'User role updated successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

export default new UserController();

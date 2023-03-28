import { Request, Response } from 'express';
import logService from '../service/logService';

class LogController {
  getLogs = async (_: Request, res: Response): Promise<Response> => {
    try {
      const brands = await logService.getLogs();

      return res.status(200).json(brands);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

export default new LogController();

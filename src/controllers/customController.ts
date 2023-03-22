import { Request, Response } from 'express';
import CustomService from '../service/customService';

class CustomController {
  createCustom = async (req: Request, res: Response): Promise<Response> => {
    const { productIds } = req.body;
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = user.id;

    try {
      const custom = await CustomService.createCustomProduct({
        userId,
        productIds,
      });

      return res.status(200).json(custom);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  getCustomsByUserId = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = user.id;

    try {
      const customs = await CustomService.getCustomsByUserId(userId);

      return res.status(200).json(customs);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

export default new CustomController();

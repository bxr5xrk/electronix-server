import { Request, Response } from 'express';
import BrandService from '../service/brandService';

class BrandController {
  getBrands = async (_: Request, res: Response): Promise<Response> => {
    try {
      const brands = await BrandService.getBrands();

      return res.status(200).json(brands);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  getBrandById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const brand = await BrandService.getBrandById(Number(id));

      return res.status(200).json({ brand });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

export default new BrandController();

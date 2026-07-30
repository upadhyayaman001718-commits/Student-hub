import { Request, Response, NextFunction } from 'express';
import { UploadsService } from '../services/uploads.service';
import { successResponse } from '../../../shared/responses/api-response';

export class UploadsController {
  private uploadsService: UploadsService;

  constructor() {
    this.uploadsService = new UploadsService();
  }

  upload = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.uploadsService.uploadFile(req.body);
      successResponse(res, result, 201);
    } catch (error) {
      next(error);
    }
  };
}

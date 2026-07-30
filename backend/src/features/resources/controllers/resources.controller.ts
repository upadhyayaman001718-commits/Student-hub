import { Request, Response, NextFunction } from 'express';
import { ResourcesService } from '../services/resources.service';
import { successResponse } from '../../../shared/responses/api-response';

export class ResourcesController {
  private resourcesService: ResourcesService;

  constructor() {
    this.resourcesService = new ResourcesService();
  }

  getResources = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.resourcesService.getResources();
      successResponse(res, result, 200);
    } catch (error) {
      next(error);
    }
  };
}

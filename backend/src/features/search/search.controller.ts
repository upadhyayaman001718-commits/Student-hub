import { Request, Response, NextFunction } from 'express';
import { SearchService } from './search.service';
import { successResponse } from '../../shared/responses/api-response';

export class SearchController {
  private searchService: SearchService;

  constructor() {
    this.searchService = new SearchService();
  }

  search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const q = String(req.query.q || '');
      const result = await this.searchService.search({ q });
      successResponse(res, result, 200);
    } catch (error) {
      next(error);
    }
  };
}

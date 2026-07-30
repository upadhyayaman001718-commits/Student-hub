import { Request, Response, NextFunction } from 'express';
import { BookmarksService } from '../services/bookmarks.service';
import { successResponse } from '../../../shared/responses/api-response';

export class BookmarksController {
  private bookmarksService: BookmarksService;

  constructor() {
    this.bookmarksService = new BookmarksService();
  }

  getBookmarks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.bookmarksService.getBookmarks('usr_placeholder');
      successResponse(res, result, 200);
    } catch (error) {
      next(error);
    }
  };
}

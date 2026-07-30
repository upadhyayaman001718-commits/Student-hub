import { Request, Response, NextFunction } from 'express';
import { UsersService } from './users.service';
import { successResponse } from '../../shared/responses/api-response';

export class UsersController {
  private usersService: UsersService;

  constructor() {
    this.usersService = new UsersService();
  }

  getProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await this.usersService.getProfile('usr_placeholder');
      successResponse(res, result, 200);
    } catch (error) {
      next(error);
    }
  };
}

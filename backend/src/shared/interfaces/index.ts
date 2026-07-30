import { JwtPayload } from '../types';

export interface AuthenticatedRequest extends Express.Request {
  user?: JwtPayload;
}

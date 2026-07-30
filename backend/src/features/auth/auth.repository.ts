import { prisma } from '../../lib/prisma';
import { RegisterInput } from './auth.types';

export class AuthRepository {
  async findUserByEmail(email: string) {
    // Database query via Prisma placeholder
    return null;
  }

  async createUser(data: RegisterInput) {
    // Database creation via Prisma placeholder
    return null;
  }
}

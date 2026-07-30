import { prisma } from '../../../lib/prisma';
import { RegisterInput } from '../types/auth.types';

export class AuthRepository {
  async findUserByEmail(email: string) {
    return null;
  }

  async createUser(data: RegisterInput) {
    return null;
  }
}

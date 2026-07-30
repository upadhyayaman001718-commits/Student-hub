import { UsersRepository } from './users.repository';
import { UserProfile } from './users.types';

export class UsersService {
  private usersRepository: UsersRepository;

  constructor() {
    this.usersRepository = new UsersRepository();
  }

  async getProfile(userId: string): Promise<UserProfile> {
    return {
      id: userId,
      email: 'user@university.edu',
      fullName: 'Student User',
      role: 'STUDENT',
    };
  }
}

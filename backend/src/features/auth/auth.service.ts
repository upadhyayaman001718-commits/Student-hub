import { AuthRepository } from './auth.repository';
import { LoginInput, RegisterInput, AuthResult } from './auth.types';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async login(input: LoginInput): Promise<AuthResult> {
    // Pure business logic placeholder
    return {
      token: 'placeholder-jwt-token',
      user: {
        id: 'usr_placeholder',
        email: input.email,
        fullName: 'Placeholder User',
        role: 'STUDENT',
      },
    };
  }

  async register(input: RegisterInput): Promise<AuthResult> {
    // Pure business logic placeholder
    return {
      token: 'placeholder-jwt-token',
      user: {
        id: 'usr_placeholder',
        email: input.email,
        fullName: input.fullName,
        role: 'STUDENT',
      },
    };
  }
}

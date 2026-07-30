export type UserRole = 'STUDENT' | 'CONTRIBUTOR' | 'ADMIN';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

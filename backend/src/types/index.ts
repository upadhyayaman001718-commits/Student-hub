export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    page?: number;
    limit?: number;
    totalCount?: number;
    totalPages?: number;
  };
}

export interface UserPayload {
  userId: string;
  email: string;
  role: 'STUDENT' | 'CONTRIBUTOR' | 'ADMIN';
}

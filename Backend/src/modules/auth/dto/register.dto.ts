export interface RegisterDto {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role?: 'CUSTOMER' | 'ADMIN' | 'TECHNICIAN';
}

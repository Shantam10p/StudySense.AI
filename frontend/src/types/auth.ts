export type AuthUser = {
  id: number;
  name: string;
  email: string;
  is_active: boolean;
  created_at: string;
};

export type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthResponse = {
  access_token: string;
  token_type: string;
  user: AuthUser;
};

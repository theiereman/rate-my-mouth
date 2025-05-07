export interface LoginFormData {
  email: string;
  password: string;
  remember_me: boolean;
  [key: string]: string | boolean;
}

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  password_confirmation: string;
  [key: string]: string;
}

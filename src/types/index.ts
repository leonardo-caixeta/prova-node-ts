export type ServiceResponse<T = any> = {
  status: string;
  message: T;
};

export type ValidationResult = {
  status: string;
  message: string | undefined;
} | null;

export interface LoginDTO {
  email: string;
  password: string;
}

export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  cargo: string;
}

export interface UpdateUserDTO {
  name: string;
  email: string;
  password?: string;
}

export interface RoleDTO {
  name: string;
}

export interface GetRole extends RoleDTO {
  id: number;
}

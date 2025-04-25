import { ValidationResult } from '../types';
import { GetRole } from '../types/Role';
import { ServiceResponse } from '../types/ServiceResponse';
import { GetUser } from '../types/User';

export interface IRoleService {
  getAll(): Promise<ServiceResponse<GetRole[]> | ValidationResult>;
  getById(id: number): Promise<ServiceResponse<GetRole | string>>;
  create(data: {
    name: string;
  }): Promise<ServiceResponse<string> | ValidationResult>;
  update(req: {
    body: { name: string };
    params: { id: number };
  }): Promise<ServiceResponse<string> | ValidationResult>;
  deleteRole(id: number): Promise<ServiceResponse<string | GetRole>>;
}

export interface IUserService {
  getAll(): Promise<ServiceResponse<GetUser[]> | ValidationResult>;
  getById(id: number): Promise<ServiceResponse<GetUser | string>>;
  create(data: {
    name: string;
  }): Promise<ServiceResponse<string> | ValidationResult>;
  update(req: {
    body: { name: string };
    params: { id: number };
  }): Promise<ServiceResponse<string> | ValidationResult>;
  deleteUser(id: number): Promise<ServiceResponse<string | GetUser>>;
}


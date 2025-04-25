import { GetRole, ServiceResponse, ValidationResult } from '../types';

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

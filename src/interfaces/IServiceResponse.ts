import { ValidationResult } from '../types';
import { IUserUpdateRequest } from '../types/Request';
import { GetRole } from '../types/Role';
import { ServiceResponse } from '../types/ServiceResponse';
import { GetUser, IUserCreate, IUserLogin, IUserUpdate } from '../types/User';

export interface IRoleService {
  getAll(): Promise<ServiceResponse<GetRole[]> | string>;
  getById(id: number): Promise<ServiceResponse<GetRole | string>>;
  getByName(name: string): Promise<ServiceResponse<GetRole | string>>;
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
  login(data: IUserLogin): Promise<ServiceResponse<string> | ValidationResult>;
  getAll(): Promise<ServiceResponse<GetUser[] | string>>;
  getById(id: number): Promise<ServiceResponse<GetUser | string>>;
  getByEmail(email: string): Promise<ServiceResponse<GetUser | string>>;
  create(
    data: IUserCreate
  ): Promise<ServiceResponse<string> | ValidationResult>;
  update(
    req: IUserUpdateRequest
  ): Promise<ServiceResponse<string> | ValidationResult>;
  deleteUser(id: number): Promise<ServiceResponse<string | GetUser>>;
}

export interface IBilletService {
  getAll(): Promise<ServiceResponse<TBillet[] | string>>;
  getById(id: number): Promise<ServiceResponse<TBillet | string>>;
  getByUserId(id: number): Promise<ServiceResponse<TBillet | string>>;
  create(
    data: IBilletCreate
  ): Promise<ServiceResponse<string> | ValidationResult>;
  update(req: {
    body: IBilletUpdate;
    params: { id: number };
  }): Promise<ServiceResponse<string> | ValidationResult>;
  deleteBillet(id: number): Promise<ServiceResponse<string | TBillet>>;
}

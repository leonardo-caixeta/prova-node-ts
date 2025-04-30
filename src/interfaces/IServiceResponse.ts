import { ValidationResult } from '../types';
import { IBilletUpdateRequest, IUserUpdateRequest } from './Request';
import { GetRole, IRoleCreate, IRoleUpdate } from './IRole';
import { ServiceResponse } from '../types/ServiceResponse';
import {
  GetUser,
  IUserCreate,
  IUserLogin,
  IUserUpdate
} from '../interfaces/IUser';

export interface IRoleService {
  getAll(): Promise<ServiceResponse<GetRole[]> | string>;
  getById(id: string): Promise<ServiceResponse<GetRole | string>>;
  getByName(name: string): Promise<ServiceResponse<GetRole | string>>;
  create(
    data: IRoleCreate
  ): Promise<ServiceResponse<string> | ValidationResult>;
  update(req: IRoleUpdate): Promise<ServiceResponse<string> | ValidationResult>;
  deleteRole(id: string): Promise<ServiceResponse<string | GetRole>>;
}

export interface IUserService {
  login(data: IUserLogin): Promise<ServiceResponse<string> | ValidationResult>;
  getAll(): Promise<ServiceResponse<GetUser[] | string>>;
  getById(id: string): Promise<ServiceResponse<GetUser | string>>;
  getByEmail(email: string): Promise<ServiceResponse<GetUser | string>>;
  create(
    data: IUserCreate
  ): Promise<ServiceResponse<string> | ValidationResult>;
  update(
    req: IUserUpdateRequest
  ): Promise<ServiceResponse<string> | ValidationResult>;
  deleteUser(id: string): Promise<ServiceResponse<string | GetUser>>;
}

export interface IBilletService {
  getAll(): Promise<ServiceResponse<TBillet[] | string>>;
  getById(id: string): Promise<ServiceResponse<TBillet | string>>;
  getByUserId(userId: string): Promise<ServiceResponse<TBillet[] | string>>;
  create(
    data: IBilletCreate
  ): Promise<ServiceResponse<string> | ValidationResult>;
  update(
    req: IBilletUpdateRequest
  ): Promise<ServiceResponse<string> | ValidationResult>;
  deleteBillet(id: string): Promise<ServiceResponse<string | TBillet>>;
}

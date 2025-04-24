import { Request } from 'express';
import { IUserCreate, IUserUpdate, IUserLogin } from './User';
import { IRoleCreate } from './Role';

export interface IUserCreateRequest extends Request {
  body: IUserCreate;
}

export interface IUserUpdateRequest extends Request {
  body: IUserUpdate;
  params: { id: string };
}

export interface IUserLoginRequest extends Request {
  body: IUserLogin;
}

export interface IRoleCreateRequest extends Request {
  body: IRoleCreate;
}

export interface IRoleIdRequest extends Request {
  params: { id: string };
}

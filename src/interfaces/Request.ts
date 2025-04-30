import { Request } from 'express';
import { IUserUpdate } from './IUser';
import { IBilletUpdate } from './IBillet';

export interface IUserUpdateRequest extends Request {
  body: IUserUpdate;
  params: { id: string };
}

export interface IBilletUpdateRequest extends Request {
  body: IBilletUpdate;
  params: { id: string };
}

// export interface IUserCreateRequest extends Request {
//   body: IUserCreate;
// }

// export interface IUserLoginRequest extends Request {
//   body: IUserLogin;
// }

// export interface IRoleCreateRequest extends Request {
//   body: IRoleCreate;
// }

// export interface IRoleIdRequest extends Request {
//   params: { id: string };
// }

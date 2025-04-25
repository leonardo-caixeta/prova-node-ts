export interface IUserBase {
  name: string;
  email: string;
  password: string;
}

export interface IUserCreate extends IUserBase {
  cargo: string;
}

export interface IUserUpdate {
  name: string;
  email: string;
  password?: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface GetUser extends IUserBase {
  cargoId: number;
  role: [];
}

import { RoleDTO } from ".";

export interface IRoleCreate {
  name: string;
}

export interface GetRole extends RoleDTO {
  id: number;
}
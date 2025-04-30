export interface RoleDTO {
  name: string;
}

export interface IRoleCreate {
  name: string;
}

export interface IRoleUpdate {
  body: { name: string };
  params: { id: string };
}

export interface GetRole extends RoleDTO {
  id: number;
}

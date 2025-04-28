import { PrismaClient } from '@prisma/client';
import { ValidationResult } from '../types';
import { validateRole } from '../utils/validators';
import { IRoleService } from '../interfaces/IServiceResponse';
import { GetRole } from '../types/Role';
import { ServiceResponse } from '../types/ServiceResponse';

const prisma = new PrismaClient();

export class RoleService implements IRoleService {
  async getAll(): Promise<ServiceResponse<GetRole[]> | string> {
    const roles = await prisma.role.findMany();
    if (!roles) return { status: 'NOT_FOUND', message: 'No roles found' };

    return {
      status: 'SUCCESSFUL',
      message: roles.map((el) => ({ id: el.id, name: el.name }))
    };
  }

  public async getById(id: number): Promise<ServiceResponse<GetRole | string>> {
    const unicRole = await prisma.role.findUnique({ where: { id } });
    if (!unicRole)
      return {
        status: 'NOT_FOUND',
        message: `Role with id: ${id} not found`
      };

    return { status: 'SUCCESSFUL', message: unicRole };
  }

  async getByName(name: string): Promise<ServiceResponse<GetRole | string>> {
    const unicRole = await prisma.role.findFirst({ where: { name } });
    if (!unicRole)
      return {
        status: 'NOT_FOUND',
        message: `Role with name: ${unicRole} not found`
      };

    return { status: 'SUCCESSFUL', message: unicRole };
  }

  async create({
    name
  }: {
    name: string;
  }): Promise<ServiceResponse<string> | ValidationResult> {
    const validation = validateRole({ name });
    if (validation) return validation;

    const roleExists = await prisma.role.findFirst({ where: { name: name } });
    if (roleExists)
      return { status: 'CONFLICT', message: 'This role exists in the system' };

    const created = await prisma.role.create({ data: { name: name } });
    if (!created) return { status: 'CONFLICT', message: 'Role not created' };

    return { status: 'CREATED', message: `Role: ${name} created` };
  }

  async update({
    body,
    params
  }: {
    body: { name: string };
    params: { id: number };
  }): Promise<ServiceResponse<string> | ValidationResult> {
    const { name } = body;
    const { id } = params;

    const validation = validateRole({ name });
    if (validation) return validation;

    const roleExists = await prisma.role.findUnique({
      where: { id: Number(id) }
    });
    if (!roleExists)
      return {
        status: 'CONFLICT',
        message: 'Role does not exist in the system'
      };

    const updated = await prisma.role.update({
      where: { id: Number(id) },
      data: { name: name }
    });

    if (!updated) return { status: 'CONFLICT', message: 'Role not updated' };

    return { status: 'SUCCESSFUL', message: `Role name updated to ${name}` };
  }

  async deleteRole(id: number): Promise<ServiceResponse<string | GetRole>> {
    if (!id) return { status: 'REQUIRED_DATA', message: 'Id is required' };
    const unicRole = await prisma.role.findUnique({ where: { id } });
    if (!unicRole)
      return {
        status: 'NOT_FOUND',
        message: `Role with id: ${id} not found`
      };

    await prisma.role.delete({ where: { id } });

    return {
      status: 'SUCCESSFUL',
      message: `Role with id: ${id} was deleted`
    };
  }
}

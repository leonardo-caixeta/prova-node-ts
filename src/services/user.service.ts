import { PrismaClient } from '@prisma/client';
import { IUserService } from '../interfaces/IServiceResponse';
import { ValidationResult } from '../types';
import { ServiceResponse } from '../types/ServiceResponse';
import { GetUser, IUserCreate, IUserLogin, IUserUpdate } from '../types/User';
import {
  validateCreate,
  validateLogin,
  validateUpdate
} from '../utils/validators';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export class UserService implements IUserService {
  async login({
    email,
    password
  }: IUserLogin): Promise<ServiceResponse<string> | ValidationResult> {
    const validateBody = validateLogin({ email, password });
    if (validateBody) return validateBody;

    const userData = await prisma.user.findFirst({ where: { email } });
    if (!userData) return { status: 'NOT_FOUND', message: 'User not found' };

    const validPassword = await bcrypt.compare(password, userData.password);
    if (!validPassword)
      return { status: 'INVALID_DATA', message: 'Invalid password' };

    const secret = process.env.JWT_SECRET as string;
    const token = jwt.sign({ id: userData.id, role: userData.roleId }, secret, {
      expiresIn: '2d'
    });
    return { status: 'SUCCESSFUL', message: token };
  }

  async getAll(): Promise<ServiceResponse<GetUser[] | string>> {
    const users = await prisma.user.findMany({
      include: { role: true, billet: true }
    });
    if (!users) return { status: 'NOT_FOUND', message: 'No users found' };

    return { status: 'SUCCESSFUL', message: users };
  }
  async getById(id: number): Promise<ServiceResponse<GetUser | string>> {
    if (!id) return { status: 'INVALID_DATA', message: 'Id is required' };
    const unicUser = await prisma.user.findUnique({ where: { id } });
    if (!unicUser)
      return { status: 'NOT_FOUND', message: `User with id: ${id} not found` };

    return { status: 'SUCCESSFUL', message: unicUser };
  }
  async getByEmail(email: string): Promise<ServiceResponse<GetUser | string>> {
    if (!email) return { status: 'INVALID_DATA', message: 'Email is required' };

    const unicUser = await prisma.user.findUnique({ where: { email } });
    if (!unicUser)
      return {
        status: 'NOT_FOUND',
        message: `User with email: ${email} not found`
      };

    return { status: 'SUCCESSFUL', message: unicUser };
  }
  async create(
    data: IUserCreate
  ): Promise<ServiceResponse<string> | ValidationResult> {
    const { name, email, password, cargo } = data;
    const validation = validateCreate(data);
    if (validation) return validation;

    const roleExists = await prisma.role.findFirst({ where: { name: cargo } });
    if (!roleExists)
      return { status: 'NOT_FOUND', message: `Role ${cargo} not found` };

    const userExists = await prisma.user.findFirst({ where: { email } });
    if (userExists)
      return {
        status: 'INVALID_DATA',
        message: `User with email: ${email} already exists`
      };

    const hashedPassword = await bcrypt.hash(password, 10);
    const created = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        roleId: roleExists.id as any
      }
    });
    if (!created)
      return { status: 'CONFLICT', message: `User ${name} not created` };

    return { status: 'CREATED', message: `User ${name} created` };
  }
  async update(req: {
    body: IUserUpdate;
    params: { id: number };
  }): Promise<ServiceResponse<string> | ValidationResult> {
    const { name, email, password } = req.body;
    const id = Number(req.params.id);

    const validation = validateUpdate(req.body, id);
    if (validation) return validation;

    let dataToUpdate: IUserUpdate = { email, name };
    if (password) {
      dataToUpdate.password = await bcrypt.hash(password, 10);
    }

    const updated = await prisma.user.update({
      where: { id },
      data: dataToUpdate
    });
    if (!updated) return { status: 'CONFLICT', message: 'Not able to update' };

    return {
      status: 'SUCCESSFUL',
      message: `User ${name} with id: ${id} was updated`
    };
  }
  async deleteUser(id: number): Promise<ServiceResponse<string | GetUser>> {
    if (!id) return { status: 'INVALID_DATA', message: 'Id is required' };
    const unicUser = await this.getById(id);
    if (unicUser.status === 'NOT_FOUND') return unicUser;

    await prisma.user.delete({ where: { id } });
    return { status: 'SUCCESSFUL', message: `User with id: ${id} was deleted` };
  }
}

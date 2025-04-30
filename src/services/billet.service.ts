import { PrismaClient } from '@prisma/client';
import { IBilletService } from '../interfaces/IServiceResponse';
import { ValidationResult } from '../types';
import { ServiceResponse } from '../types/ServiceResponse';
import { IBilletUpdateRequest } from '../interfaces/Request';
import { GetBillet, IBilletCreate } from '../interfaces/IBillet';
import {
  validateCreateBillet,
  validateUpdateBillet
} from '../utils/validators';

const prisma = new PrismaClient();

export class BilletService implements IBilletService {
  async getAll(): Promise<ServiceResponse<GetBillet[] | string>> {
    const billets = await prisma.billet.findMany({
      include: { user: true }
    });
    if (!billets) return { status: 'NOT_FOUND', message: 'Billets not found' };

    return { status: 'SUCCESSFUL', message: billets };
  }

  async getById(id: string): Promise<ServiceResponse<GetBillet | string>> {
    if (!id) return { status: 'INVALID_DATA', message: 'Id is required' };

    const ID = parseInt(id, 10);
    const unicBillet = await prisma.billet.findUnique({ where: { id: ID } });
    if (!unicBillet)
      return {
        status: 'NOT_FOUND',
        message: `Billet with id: ${id} not found`
      };

    return { status: 'SUCCESSFUL', message: unicBillet };
  }

  async getByUserId(
    userId: string
  ): Promise<ServiceResponse<GetBillet[] | string>> {
    const userIdNumber = parseInt(userId, 10);
    if (!userId) return { status: 'INVALID_DATA', message: 'Id is required' };
    const unicBillet = await prisma.billet.findMany({
      where: { userId: userIdNumber }
    });
    if (!unicBillet)
      return {
        status: 'NOT_FOUND',
        message: `Billet with userId: ${userId} not found`
      };

    return { status: 'SUCCESSFUL', message: unicBillet };
  }

  async create(
    data: IBilletCreate
  ): Promise<ServiceResponse<string> | ValidationResult> {
    const validation = validateCreateBillet(data);
    if (validation) return validation;

    const created = await prisma.billet.create({
      data: {
        valueToPay: data.valueToPay,
        payDay: data.payDay,
        userId: data.userId
      }
    });

    if (!created) return { status: 'CONFLICT', message: 'Billet not created' };

    return { status: 'CREATED', message: 'Billet created' };
  }
  async update(
    req: IBilletUpdateRequest
  ): Promise<ServiceResponse<string> | ValidationResult> {
    const validation = validateUpdateBillet(req.body);
    if (validation) return validation;

    const id = parseInt(req.params.id, 10);
    if (!id) return { status: 'INVALID_DATA', message: 'Id is required' };

    const billetExists = await prisma.billet.findUnique({ where: { id } });
    if (!billetExists)
      return {
        status: 'NOT_FOUND',
        message: `Billet with id: ${id} not found`
      };

    const updated = await prisma.billet.update({
      where: { id },
      data: req.body
    });
    if (!updated) return { status: 'CONFLICT', message: 'Billet not updated' };

    return { status: 'SUCCESSFUL', message: `Billet with id: ${id} updated` };
  }

  async deleteBillet(id: string): Promise<ServiceResponse<string | GetBillet>> {
    if (!id) return { status: 'INVALID_DATA', message: 'Id is required' };
    const numberId = parseInt(id, 10);

    const billetExists = await prisma.billet.findUnique({
      where: { id: numberId }
    });
    if (!billetExists)
      return {
        status: 'NOT_FOUND',
        message: `Billet with id: ${numberId} not found`
      };

    await prisma.billet.delete({ where: { id: numberId } });

    return {
      status: 'SUCCESSFUL',
      message: `Billet with id: ${numberId} deleted`
    };
  }
}

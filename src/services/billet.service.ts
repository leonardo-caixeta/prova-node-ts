import { PrismaClient } from '@prisma/client';
import { IBilletService } from '../interfaces/IServiceResponse';
import { ValidationResult } from '../types';
import { ServiceResponse } from '../types/ServiceResponse';
import { IBilletUpdateRequest } from '../interfaces/Request';

const prisma = new PrismaClient();

export class BilletService implements IBilletService {
  async getAll(): Promise<ServiceResponse<TBillet[] | string>> {
    const billets = await prisma.billet.findMany({
      include: { user: true }
    });
    if (!billets) return { status: 'NOT_FOUND', message: 'Billets not found' };

    return { status: 'SUCCESSFUL', message: billets };
  }
  async getById(id: string): Promise<ServiceResponse<TBillet | string>> {
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
  ): Promise<ServiceResponse<TBillet[] | string>> {
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
  create(
    data: IBilletCreate
  ): Promise<ServiceResponse<string> | ValidationResult> {
    throw new Error('Method not implemented.');
  }
  update(
    req: IBilletUpdateRequest
  ): Promise<ServiceResponse<string> | ValidationResult> {
    throw new Error('Method not implemented.');
  }
  deleteBillet(id: string): Promise<ServiceResponse<string | TBillet>> {
    throw new Error('Method not implemented.');
  }
}

import { PrismaClient } from '@prisma/client';
import { IBilletService } from '../interfaces/IServiceResponse';
import { ValidationResult } from '../types';
import { ServiceResponse } from '../types/ServiceResponse';

const prisma = new PrismaClient();

export class BilletService implements IBilletService {
  async getAll(): Promise<ServiceResponse<TBillet[] | string>> {
    const billets = await prisma.billet.findMany({
      include: { user: true }
    });
    if (!billets) return { status: 'NOT_FOUND', message: 'Billets not found' };

    return { status: 'SUCCESSFUL', message: billets };
  }
  async getById(id: number): Promise<ServiceResponse<TBillet | string>> {
    if (!id) return { status: 'INVALID_DATA', message: 'Id is required' };

    const unicBillet = await prisma.billet.findUnique({ where: { id } });
    if (!unicBillet)
      return {
        status: 'NOT_FOUND',
        message: `Billet with id: ${id} not found`
      };

    return { status: 'SUCCESSFUL', message: unicBillet };
  }
  async getByUserId(id: number): Promise<ServiceResponse<TBillet | string>> {
    if (!id) return { status: 'INVALID_DATA', message: 'Id is required' };
    const unicBillet = await prisma.billet.findFirst({ where: { userId: id } });
    if (!unicBillet)
      return {
        status: 'NOT_FOUND',
        message: `Billet with userId: ${id} not found`
      };

    return { status: 'SUCCESSFUL', message: unicBillet };
  }
  create(
    data: IBilletCreate
  ): Promise<ServiceResponse<string> | ValidationResult> {
    throw new Error('Method not implemented.');
  }
  update(req: {
    body: IBilletUpdate;
    params: { id: number };
  }): Promise<ServiceResponse<string> | ValidationResult> {
    throw new Error('Method not implemented.');
  }
  deleteBillet(id: number): Promise<ServiceResponse<string | TBillet>> {
    throw new Error('Method not implemented.');
  }
}

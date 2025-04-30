import { Request, Response } from 'express';
import { BilletService } from '../services/billet.service';
import { Return } from '../types';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

const billetService = new BilletService();

export async function get(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await billetService.getAll()) as Return;
    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function getById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { status, message } = await billetService.getById(id);
    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function getByUserId(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { status, message } = await billetService.getByUserId(
      req.params.userId
    );

    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function create(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await billetService.create(
      req.body
    )) as Return;
    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    console.error(error);
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function update(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await billetService.update(
      req as any
    )) as Return;
    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function billetDelete(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { status, message } = await billetService.deleteBillet(id);
    return res.status(mapStatusHTTP(status)).json(message);
  } catch (error) {
    console.error(error);
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

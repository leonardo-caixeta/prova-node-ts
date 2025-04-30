import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';
import { Return } from '../types';

const userService = new UserService();

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await userService.login(req.body)) as Return;

    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    console.error(error);
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function get(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await userService.getAll()) as Return;

    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    console.error(error);
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function getById(req: Request, res: Response): Promise<Response> {
  try {
    const { id } = req.params;
    const { status, message } = await userService.getById(id);

    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function getByEmail(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { status, message } = await userService.getByEmail(req.params.email);
    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function create(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await userService.create(req.body)) as Return;

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
    const { status, message } = (await userService.update(
      req as any
    )) as Return;

    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function userDelete(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const { id } = req.params;
    const { status, message } = await userService.deleteUser(id);

    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    console.error(error);
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export default { get, getById, getByEmail, create, update, userDelete, login };

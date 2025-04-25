import { Request, Response } from 'express';
import { RoleService } from '../services/role.service';
import { mapStatusHTTP } from '../utils/mapStatusHTTP';

const roleService = new RoleService();
export async function get(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await roleService.getAll()) as {
      status: string;
      message: any;
    };
    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    console.error(error);
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function create(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await roleService.create(req.body)) as {
      status: string;
      message: any;
    };
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
    const id = parseInt(req.params.id, 10);
    const { status, message } = await roleService.getById(id);
    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function update(req: Request, res: Response): Promise<Response> {
  try {
    const { status, message } = (await roleService.update(req as any)) as {
      status: string;
      message: any;
    };
    return res.status(mapStatusHTTP(status)).json({ message });
  } catch (error) {
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

export async function roleDelete(
  req: Request,
  res: Response
): Promise<Response> {
  try {
    const id = parseInt(req.params.id, 10);
    const { status, message } = await roleService.deleteRole(id);
    return res.status(mapStatusHTTP(status)).json(message);
  } catch (error) {
    console.error(error);
    return res
      .status(mapStatusHTTP('INTERNAL_ERROR'))
      .json({ message: 'Internal error' });
  }
}

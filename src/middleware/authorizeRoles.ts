import { Request, Response, NextFunction } from 'express';

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role; // o `req.user` deve ser preenchido no authMiddleware

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res
        .status(403)
        .json({ message: 'Access forbidden: insufficient permissions' });
    }

    next();
  };
}

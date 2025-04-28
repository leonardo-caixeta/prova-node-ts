// import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// const prisma = new PrismaClient();

export async function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  try {
    const jwtSecret = process.env.JWT_SECRET as string;
    jwt.verify(token, jwtSecret) as { id: number };

    /*
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      include: { role: true }
    });
    console.log(user);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.user = {
      id: decoded.id,
      role: user.role?.name || ''
    };
    */
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido' });
  }
}

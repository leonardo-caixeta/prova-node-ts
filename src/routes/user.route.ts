import express from 'express';
import * as role from '../controller/user.controller';
import { authenticateToken } from '../middleware/authenticateToken';
import { authorizeRoles } from '../middleware/authorizeRoles';

const router = express.Router();

router.get('/login', role.login as any);
router.get(
  '/',
  authenticateToken as any,
  authorizeRoles('Admin', 'User', 'Master') as any,
  role.get as any
);
router.get(
  '/:id',
  authenticateToken as any,
  authorizeRoles('Admin', 'User', 'Master') as any,
  role.getById as any
);
router.get(
  '/byEmail/:email',
  authenticateToken as any,
  authorizeRoles('Admin', 'User', 'Master') as any,
  role.getByEmail as any
);
router.post(
  '/',
  authenticateToken as any,
  authorizeRoles('Admin', 'User', 'Master') as any,
  role.create as any
);
router.patch(
  '/:id',
  authenticateToken as any,
  authorizeRoles('Admin', 'Master') as any,
  role.update as any
);
router.delete(
  '/:id',
  authenticateToken as any,
  authorizeRoles('Master') as any,
  role.userDelete as any
);

export default router;

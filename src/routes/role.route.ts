import express from 'express';
import * as role from '../controller/role.controller';
import { authenticateToken } from '../middleware/authenticateToken';
import { authorizeRoles } from '../middleware/authorizeRoles';

const router = express.Router();

router.get('/', role.get as any);
router.get('/:id', role.getById as any);
router.get('/byName/:name', role.getByName as any);
router.post('/', role.create as any);
router.patch(
  '/:id',
  authenticateToken as any,
  authorizeRoles('Master') as any,
  role.update as any
);
router.delete(
  '/:id',
  authenticateToken as any,
  authorizeRoles('Master') as any,
  role.roleDelete as any
);

export default router;

import express from 'express';
import * as billet from '../controller/billet.controller';
import { authenticateToken } from '../middleware/authenticateToken';
import { authorizeRoles } from '../middleware/authorizeRoles';

const router = express.Router();

router.get('/', billet.get as any);
router.get('/:id', billet.getById as any);
router.get('/byUserId/:userId', billet.getByUserId as any);
// router.post('/', billet.create as any);
// router.patch(
//   '/:id',
//   authenticateToken as any,
//   authorizeRoles('Master') as any,
//   billet.update as any
// );
// router.delete(
//   '/:id',
//   authenticateToken as any,
//   authorizeRoles('Master') as any,
//   billet.billetDelete as any
// );

export default router;

import express from 'express';
import * as role from '../controller/role.controller';

const router = express.Router();

router.get('/', role.get as any);
router.get('/:id', role.getById as any);
router.post('/', role.create as any);
router.patch('/:id', role.update as any);
router.delete('/:id', role.roleDelete as any);

export default router;

import { Router } from 'express';
import { ResourcesController } from './resources.controller';

const router = Router();
const resourcesController = new ResourcesController();

router.get('/', resourcesController.getResources);

export default router;

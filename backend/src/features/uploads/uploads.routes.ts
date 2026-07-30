import { Router } from 'express';
import { UploadsController } from './uploads.controller';

const router = Router();
const uploadsController = new UploadsController();

router.post('/', uploadsController.upload);

export default router;

import { Router, Request, Response } from 'express';
import { authRoutes } from '../features/auth';
import { usersRoutes } from '../features/users';
import { resourcesRoutes } from '../features/resources';
import { bookmarksRoutes } from '../features/bookmarks';
import { searchRoutes } from '../features/search';
import { uploadsRoutes } from '../features/uploads';

const router = Router();

// Base API status endpoint
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Student Hub REST API v1',
    version: '1.0.0',
    architecture: 'Hybrid Feature-Based Architecture',
  });
});

// Feature Routes
router.use('/auth', authRoutes);
router.use('/users', usersRoutes);
router.use('/resources', resourcesRoutes);
router.use('/bookmarks', bookmarksRoutes);
router.use('/search', searchRoutes);
router.use('/uploads', uploadsRoutes);

export default router;

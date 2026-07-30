import { Router } from 'express';
import { BookmarksController } from '../controllers/bookmarks.controller';

const router = Router();
const bookmarksController = new BookmarksController();

router.get('/', bookmarksController.getBookmarks);

export default router;

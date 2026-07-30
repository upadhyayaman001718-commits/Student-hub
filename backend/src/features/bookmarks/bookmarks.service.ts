import { BookmarksRepository } from './bookmarks.repository';
import { BookmarkItem } from './bookmarks.types';

export class BookmarksService {
  private bookmarksRepository: BookmarksRepository;

  constructor() {
    this.bookmarksRepository = new BookmarksRepository();
  }

  async getBookmarks(userId: string): Promise<BookmarkItem[]> {
    return [];
  }
}

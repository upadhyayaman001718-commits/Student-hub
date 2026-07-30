import { BookmarksRepository } from '../repositories/bookmarks.repository';
import { BookmarkItem } from '../types/bookmarks.types';

export class BookmarksService {
  private bookmarksRepository: BookmarksRepository;

  constructor() {
    this.bookmarksRepository = new BookmarksRepository();
  }

  async getBookmarks(userId: string): Promise<BookmarkItem[]> {
    return [];
  }
}

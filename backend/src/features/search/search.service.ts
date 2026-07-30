import { SearchRepository } from './search.repository';
import { SearchQueryInput, SearchResult } from './search.types';

export class SearchService {
  private searchRepository: SearchRepository;

  constructor() {
    this.searchRepository = new SearchRepository();
  }

  async search(input: SearchQueryInput): Promise<SearchResult> {
    return {
      resources: [],
      totalCount: 0,
    };
  }
}

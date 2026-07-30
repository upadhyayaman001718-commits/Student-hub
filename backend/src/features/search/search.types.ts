export interface SearchQueryInput {
  q: string;
  category?: string;
  courseCode?: string;
}

export interface SearchResult {
  resources: any[];
  totalCount: number;
}

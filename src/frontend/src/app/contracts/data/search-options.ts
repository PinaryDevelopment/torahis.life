export class SearchOptions {
  pageIndex?: number;
  maxPageSize?: number;
  searchTerm?: string;

  constructor({
    pageIndex = 0,
    maxPageSize = 25,
    searchTerm = undefined
  }: SearchOptions = {}) {
    this.pageIndex = pageIndex;
    this.maxPageSize = maxPageSize;
    this.searchTerm = searchTerm;
  }
}

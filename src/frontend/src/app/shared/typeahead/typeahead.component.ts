import { ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { SearchOptions } from '@contracts/data';
import { Observable, of, Subject, throwError, timer } from 'rxjs';
import { debounce, distinctUntilChanged, map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'pd-typeahead',
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.scss']
})
export class TypeaheadComponent<T> {
  @ContentChild('itemTemplate') itemTemplate: TemplateRef<T> | null = null;
  @Output() itemClicked = new EventEmitter<T>();

  faSearch = faSearch;

  private _searchResults$?: Observable<T[]>;
  private input = new Subject<string>();
  private _searchTerm?: string;
  private firstSearch = true;

  searchTerm?: string;
  showTypeahead = false;

  @Input() fetcher: (searchOptions: SearchOptions) => Observable<T[]> = () => throwError('a fetcher function should have been passed');

  get searchResults$(): Observable<T[]> {
    if (!this._searchResults$) {
      this._searchResults$ = this.input
                                 .pipe(
                                   debounce(() => {
                                     if (this.firstSearch) {
                                       this.firstSearch = false;
                                       return timer(0);
                                     } else {
                                       return timer(300);
                                     }
                                   }),
                                   map((input) => input.trim()),
                                   distinctUntilChanged(),
                                   tap(searchInput => this._searchTerm = searchInput),
                                   switchMap(searchInput =>
                                    searchInput
                                      ? this.fetcher({ pageIndex: 0, maxPageSize: 10, searchTerm: searchInput })
                                      : of([])
                                    ),
                                   tap(() => this.searchTerm = this._searchTerm),
                                   shareReplay(1)
                                 );
    }

    return this._searchResults$;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  onKeyup(event: KeyboardEvent): void{
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      console.log(event.key || event.keyCode);
    } else {
      const inputElement = event.target as HTMLInputElement;
      this.input.next(inputElement.value);
    }
  }

  onFocus(): void {
    this.showTypeahead = true;
  }

  onBlur(): void {
    /*
      This seems like a hack.
      When a user clicks on an item in the dropdown, the input loses focus, calling this method.
      This triggers before the onClick and effectively cancels the onClick call.
      Putting the setTimeout in here allows the onClick method to run first.
    */
    setTimeout(() => {
      this.showTypeahead = false;
      this.changeDetectorRef.markForCheck();
    }, 100);

  }

  onClick(item: T) {
    this.itemClicked.emit(item);
  }
}

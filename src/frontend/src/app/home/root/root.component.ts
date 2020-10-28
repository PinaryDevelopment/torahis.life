import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject, of, timer, Observable } from 'rxjs';
import { map, distinctUntilChanged, switchMap, tap, shareReplay, debounce } from 'rxjs/operators';
import { AudioMediaService } from '@audio-media/audio-media.service';
import { AudioMedia } from '@contracts/app';

@Component({
  selector: 'pd-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {
  private currentYear = new Date(Date.now()).getFullYear();
  private input = new Subject<string>();
  private _searchTerm?: string;
  private _searchResults$?: Observable<AudioMedia[]>;

  private firstSearch = true;
  get searchResults$(): Observable<AudioMedia[]> {
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
                                      ? this.audioMediaService.search({ pageIndex: 0, maxPageSize: 10, searchTerm: searchInput })
                                      : of([])
                                    ),
                                   tap(() => this.searchTerm = this._searchTerm),
                                   shareReplay(1)
                                 );
    }

    return this._searchResults$;
  }

  faHome = faHome;
  faSearch = faSearch;

  get copyrightYearString(): string {
    return this.currentYear === 2020 ? '2020' : `2020 - ${this.currentYear}`;
  }

  showTypeahead = false;
  searchTerm?: string;

  constructor(
    private audioMediaService: AudioMediaService
  ) {}

  onKeyup(event: KeyboardEvent): void{
    const inputElement = event.target as HTMLInputElement;
    this.input.next(inputElement.value);
  }

  onFocus(): void {
    this.showTypeahead = true;
  }

  onBlur(): void {
    this.showTypeahead = false;
  }
}

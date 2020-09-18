import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faHome, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Subject, of } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, mergeMap, switchMap, tap, shareReplay } from 'rxjs/operators';
import { AudioMediaService } from 'src/app/audio-media/audio-media.service';

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

  searchResults$ = this.input
                       .pipe(
                         debounceTime(300),
                         map((input) => input.trim()),
                         distinctUntilChanged(),
                         tap(searchInput => this._searchTerm = searchInput),
                         switchMap(searchInput => searchInput ? this.audioMediaService.search({ pageIndex: 0, maxPageSize: 10, searchTerm: searchInput }) : of([])),
                         tap(() => this.searchTerm = this._searchTerm),
                         shareReplay(1)
                       );

  faHome = faHome;
  faSearch = faSearch;
  copyrightYearString = this.currentYear === 2020 ? '2020' : `2020 - ${this.currentYear}`;
  showTypeahead = false;
  searchTerm?: string;

  constructor(
    private audioMediaService: AudioMediaService
  ) {}

  onKeyup(event: KeyboardEvent) {
    const inputElement = event.target as HTMLInputElement;
    this.input.next(inputElement.value);
  }

  onFocus() {
    this.showTypeahead = true;
  }

  onBlur() {
    this.showTypeahead = false;
  }
}

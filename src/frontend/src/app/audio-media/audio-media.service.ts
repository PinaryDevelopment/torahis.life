import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../environments/environment';
import { Observable, combineLatest, of } from 'rxjs';

import { Dtos, Contracts } from '../contracts';
import { map, shareReplay, tap } from 'rxjs/operators';
import { TagTypeDto } from '../contracts/data';

@Injectable({
  providedIn: 'root'
})
export class AudioMediaService {
  private _getTags: Observable<Dtos.TagDto[]> | undefined;
  private _latestSearchResultsLookupById: { [key: string]: Contracts.AudioMedia } = {};

  constructor(
    private http: HttpClient
  ) { }

  search(options: Dtos.SearchOptions): Observable<Contracts.AudioMedia[]> {
    const url = `${env.baseApisUri}/audio-media?pageIndex=${options.pageIndex}&maxPageSize=${options.maxPageSize}&searchTerm=${options.searchTerm || ''}`;
    const apiShiurim = this.http.get<Dtos.AudioMediaDto[]>(url);

    return combineLatest([apiShiurim, this.getTags()])
      .pipe(
        map(([shiurim, tags]) => shiurim.map(shiur => this.mapDtoToContract(shiur, tags))),
        tap(results => {
          this._latestSearchResultsLookupById = results.reduce(
            (pv: { [key: string]: Contracts.AudioMedia }, cv) => {
              pv[cv.id] = cv;
              return pv;
            },
            {}
          );
        })
      );
  }

  get(id: string): Observable<Contracts.AudioMedia> {
    if (this._latestSearchResultsLookupById[id]) {
      return of(this._latestSearchResultsLookupById[id]);
    }

    const url = `${env.baseApisUri}/audio-media?id=${id}`;
    const apiShiurim = this.http.get<Dtos.AudioMediaDto>(url);

    return combineLatest([apiShiurim, this.getTags()])
      .pipe(
        map(([shiur, tags]) => this.mapDtoToContract(shiur, tags))
      );
  }

  private getTags(): Observable<Dtos.TagDto[]> {
    if (!this._getTags) {
      this._getTags = this.http.get<Dtos.TagDto[]>(`${env.baseApisUri}/tags`).pipe(shareReplay(1));
    }

    return this._getTags;
  }

  private mapDtoToContract(media: Dtos.AudioMediaDto, tags: Dtos.TagDto[]): Contracts.AudioMedia {
    return {
      id: media.id.toString(),
      versions: [
        {
          version: tags.find(t => media.tags.find(tag => t.id === tag) && t.type === TagTypeDto.SeriesLevel3)?.tag || '',
          duration: media.duration,
          shiur: ''
        }
      ],
      author: {
        id: media.authorId,
        name: media.authorName
      },
      date: new Date(Date.parse(media.date)),
      title: media.title,
      series: tags.find(t => media.tags.find(tag => t.id === tag) && t.type === TagTypeDto.SeriesLevel2)?.tag || '',
      previousId: media.previousId,
      nextId: media.nextId
    };
  }
}

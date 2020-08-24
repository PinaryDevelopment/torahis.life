import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '../../environments/environment';
import { Observable, combineLatest } from 'rxjs';
import { AudioMedia } from '../core/audio-media';

import { Dtos } from '../contracts';
import { map } from 'rxjs/operators';
import { TagTypeDto, AudioMediaDto, TagDto } from '../contracts/data';

@Injectable({
    providedIn: 'root'
})
export class AudioMediaService {
    constructor(
        private http: HttpClient
    ) {}

    search({
      pageIndex = 0,
      maxPageSize = 25
    }: {
      pageIndex?: number,
      maxPageSize?: number
    } = {}): Observable<AudioMedia[]> {
      const url = `${env.baseApisUri}/audio-media?pageIndex=${pageIndex}&maxPageSize=${maxPageSize}`;
      const apiShiurim = this.http.get<Dtos.AudioMediaDto[]>(url);

      return combineLatest([apiShiurim, this.getTags()])
              .pipe(
                map(([shiurim, tags]) => shiurim.map(shiur => this.mapDtoToContract(shiur, tags)))
              );
    }

    getTags(): Observable<Dtos.TagDto[]> {
      return this.http.get<Dtos.TagDto[]>(`${env.baseApisUri}/tags`);
    }

    private mapDtoToContract(media: AudioMediaDto, tags: TagDto[]) {
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
        series: tags.find(t => media.tags.find(tag => t.id === tag) && t.type === TagTypeDto.SeriesLevel2)?.tag || ''
      }
    }
}

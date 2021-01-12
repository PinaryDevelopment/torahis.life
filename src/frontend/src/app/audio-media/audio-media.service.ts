import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TransferProgressEvent } from '@azure/core-http/types/latest/src/webResource';
import { BlobServiceClient } from '@azure/storage-blob';

import { environment as env } from '../../environments/environment';
import { Observable, combineLatest, of, Subject } from 'rxjs';

import * as Contracts from '@contracts/app';
import * as Dtos from '@contracts/data';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { ConfigurationService } from '../configuration.service';

@Injectable({
  providedIn: 'root'
})
export class AudioMediaService {
  private _getTags: Observable<Dtos.TagDto[]> | undefined;
  private _latestSearchResultsLookupById: { [key: string]: Contracts.AudioMedia } = {};

  constructor(
    private http: HttpClient,
    private configurationService: ConfigurationService
  ) { }

  search(options: Dtos.SearchOptions): Observable<Contracts.AudioMedia[]> {
    const url = `${env.baseApisUri}/audio-media/search?pageIndex=${options.pageIndex}&maxPageSize=${options.maxPageSize}&searchTerm=${options.searchTerm || ''}`;
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

  post(audioMedia: Dtos.AudioMediaCreateDto, file: File | null): Observable<{ id: string, progress: TransferProgressEvent }> {
    const url = `${env.baseApisUri}/audio-media/upload`;
    return this.http
               .post<Dtos.AudioMediaDto>(url, audioMedia)
               .pipe(
                 switchMap(audioFile => this.uploadFile(file)
                                            .pipe(
                                              map(progress => ({ id: audioFile.id, progress })))
                                            )
               );
  }

  fileUploaded(id: string, error?: any): Observable<void> {
    const url = `${env.baseApisUri}/audio-media/upload/${id}`;
    return this.http
               .post<void>(url, error);
  }

  private uploadFile(file: File | null): Observable<TransferProgressEvent> {
    const sub = new Subject<TransferProgressEvent>();
    if (file) {
      const url = `${env.blobStorageUri}?${this.configurationService.configuration.azureStorage.sasToken}`;
      const blobServiceClient = new BlobServiceClient(url);
      const containerClient = blobServiceClient.getContainerClient(this.configurationService.configuration.azureStorage.containerName);
      containerClient.getBlobClient(file.name)
                     .getBlockBlobClient()
                     .uploadData(
                       file,
                       {
                         onProgress: (progress: TransferProgressEvent) => sub.next(progress)
                       }
                     )
                     .then(() => sub.complete());
    } else {
      sub.error('');
    }

    return sub.asObservable();
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
          version: tags.find(t => media.tagIds.find(id => t.id === id) && t.type === Dtos.TagTypeDto.Subtitle)?.tag || '',
          duration: media.duration,
          shiur: ''
        }
      ],
      author: {
        id: media.authorId,
        name: '' // media.authorName
      },
      date: new Date(Date.parse(media.releasedOn)),
      title: media.title,
      series: tags.find(t => media.tagIds.find(id => t.id === id) && t.type === Dtos.TagTypeDto.SeferTitle)?.tag || '',
      previousId: media.previousId,
      nextId: media.nextId
    };
  }
}

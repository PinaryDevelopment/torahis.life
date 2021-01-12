import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as Contracts from '@contracts/app';
import { AudioMediaService } from './audio-media.service';
import { switchMap } from 'rxjs/operators';

export const AUDIO_MEDIA_COLLECTION_TOKEN = new InjectionToken<Observable<Contracts.AudioMedia[]>>(
  'A stream with current audio media search results collection.'
);

export const AUDIO_MEDIA_COLLECTION_PROVIDER: Provider = {
  provide: AUDIO_MEDIA_COLLECTION_TOKEN,
  deps: [
    ActivatedRoute,
    AudioMediaService
  ],
  useFactory: audioMediaSearchFactory
};

function audioMediaSearchFactory(
  { queryParams }: ActivatedRoute,
  audioMediaService: AudioMediaService
): Observable<Contracts.AudioMedia[]> {
  const defaultQueryParams = { pageIndex: 0, maxPageSize: 25, searchTerm: '' };
  return queryParams.pipe(
    switchMap(params => {
      params = { ...params, ...defaultQueryParams };
      return audioMediaService.search(params);
    })
  );
}

export const AUDIO_MEDIA_TOKEN = new InjectionToken<Observable<Contracts.AudioMedia>>(
  'A stream with a current audio media item.'
);

export const AUDIO_MEDIA_PROVIDER: Provider = {
  provide: AUDIO_MEDIA_TOKEN,
  deps: [
    ActivatedRoute,
    AudioMediaService
  ],
  useFactory: audioMediaFactory
};

function audioMediaFactory(
  { params }: ActivatedRoute,
  audioMediaService: AudioMediaService
): Observable<Contracts.AudioMedia> {
  return params.pipe(
    switchMap(p => {
      return audioMediaService.get(p.id);
    })
  );
}

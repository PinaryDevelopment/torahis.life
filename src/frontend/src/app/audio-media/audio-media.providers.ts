import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AudioMedia } from '../core/audio-media';
import { AudioMediaService } from './audio-media.service';
import { switchMap } from 'rxjs/operators';

export const AUDIO_MEDIA_COLLECTION_TOKEN = new InjectionToken<Observable<AudioMedia[]>>(
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
): Observable<AudioMedia[]> {
  const defaultQueryParams = { pageIndex: 0, maxPageSize: 25 };

  return queryParams.pipe(
    switchMap(params => {
      params = { ...params, ...defaultQueryParams };
      return audioMediaService.search(params);
    })
  );
}

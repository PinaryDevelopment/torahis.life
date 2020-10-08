import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';

import { Observable } from 'rxjs';

import { AUDIO_MEDIA_COLLECTION_PROVIDER, AUDIO_MEDIA_COLLECTION_TOKEN } from '@audio-media/index';
import { Contracts } from '@contracts/index';

@Component({
  selector: 'pd-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AUDIO_MEDIA_COLLECTION_PROVIDER]
})
export class IndexComponent {
  constructor(
    @Inject(AUDIO_MEDIA_COLLECTION_TOKEN) readonly media$: Observable<Contracts.AudioMedia[]>
  ) {}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { AudioMediaService } from '../../audio-media/audio-media.service';

@Component({
  selector: 'pd-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
  media$ = this.audioMediaService.search();

  constructor(
    private audioMediaService: AudioMediaService
  ) {}
}

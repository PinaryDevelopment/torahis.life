import { Component, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Contracts } from '../../contracts';
import { AUDIO_MEDIA_PROVIDER, AUDIO_MEDIA_TOKEN} from '../audio-media.providers';
import { Observable } from 'rxjs';

@Component({
    selector: 'pd-audio-media-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AUDIO_MEDIA_PROVIDER]
})
export class AudioMediaDetailsComponent {
  constructor(
    @Inject(AUDIO_MEDIA_TOKEN) readonly media$: Observable<Contracts.AudioMedia>
  ) {}
}

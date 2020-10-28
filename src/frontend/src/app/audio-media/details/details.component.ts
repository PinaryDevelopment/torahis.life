import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { Contracts } from '@contracts/index';
import { AUDIO_MEDIA_PROVIDER, AUDIO_MEDIA_TOKEN} from '@audio-media/audio-media.providers';
import { Observable } from 'rxjs';
import { faLongArrowAltLeft, faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'pd-audio-media-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [AUDIO_MEDIA_PROVIDER]
})
export class AudioMediaDetailsComponent {
  faLongArrowAltRight = faLongArrowAltRight;
  faLongArrowAltLeft = faLongArrowAltLeft;

  constructor(
    @Inject(AUDIO_MEDIA_TOKEN) readonly media$: Observable<Contracts.AudioMedia>
  ) {}
}

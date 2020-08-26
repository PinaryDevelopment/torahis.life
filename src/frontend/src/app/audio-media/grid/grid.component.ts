import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { AudioMedia } from 'src/app/core/audio-media';

import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'pd-audio-media-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioMediaGrid {
    @Input() collection: AudioMedia[] | null = [];

    faArrowAltCircleDown = faArrowAltCircleDown;

    download(shiur: string) {}
}

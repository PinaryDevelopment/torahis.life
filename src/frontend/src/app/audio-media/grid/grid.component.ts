import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { Contracts } from '@contracts/index';

import { faArrowAltCircleDown } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'pd-audio-media-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioMediaGridComponent {
    @Input() collection: Contracts.AudioMedia[] | null = [];

    faArrowAltCircleDown = faArrowAltCircleDown;

    download(shiur: string): void {
      console.log('download clicked: ', shiur);
    }
}

import { Component, Input, ChangeDetectionStrategy } from "@angular/core";
import { AudioMedia } from 'src/app/core/audio-media';

@Component({
    selector: 'pd-audio-media-grid',
    templateUrl: './grid.component.html',
    styleUrls: ['./grid.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioMediaGrid {
    @Input() collection: AudioMedia[] | null = [];

    download(shiur: string) {}
}

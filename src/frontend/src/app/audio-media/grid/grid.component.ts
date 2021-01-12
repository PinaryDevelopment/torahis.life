import { DOCUMENT } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy, Inject } from '@angular/core';
import * as Contracts from '@contracts/app';

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

    constructor(
      @Inject(DOCUMENT) private document: Document
    ) {}

    download(id: string): void {
      if (this.document?.defaultView) {
        this.document.defaultView.location.href = `https://torahislife.azurewebsites.net/api/ShiurRetriever?id=${id}`;
      }
    }
}

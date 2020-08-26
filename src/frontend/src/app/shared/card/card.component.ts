import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'pd-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
}

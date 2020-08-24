import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pd-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {
  private currentYear = new Date(Date.now()).getFullYear();

  copyrightYearString = this.currentYear === 2020 ? '2020' : `2020 - ${this.currentYear}`;
}

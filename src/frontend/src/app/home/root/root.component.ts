import { Component, ChangeDetectionStrategy } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { AudioMediaService } from '@audio-media/audio-media.service';
import { SearchOptions } from '@contracts/data';
import { AudioMedia } from '@contracts/app';
import { Router } from '@angular/router';

@Component({
  selector: 'pd-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RootComponent {
  private currentYear = new Date(Date.now()).getFullYear();

  faHome = faHome;

  get copyrightYearString(): string {
    return this.currentYear === 2020 ? '2020' : `2020 - ${this.currentYear}`;
  }

  search = (searchOptions: SearchOptions) => this.audioMediaService.search(searchOptions);

  constructor(
    private audioMediaService: AudioMediaService,
    private router: Router
  ) {}

  navigateToItem($event: AudioMedia): void {
    this.router.navigate(['audio', $event.id]);
  }
}

  /* https://ilikekillnerds.com/category/aurelia-2/
   https://stackoverflow.com/questions/12325787/setting-the-granularity-of-the-html5-audio-event-timeupdate#comment-69606299
*/
import { Component, ChangeDetectionStrategy, Input, ElementRef, ViewChild } from '@angular/core';
import { faPlay, faStepBackward, faBackward, faForward, faStepForward, faPause, faVolumeDown, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'pd-audio-media-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudioMediaPlayerComponent {
  faPlay = faPlay;
  faStepBackward = faStepBackward;
  faBackward = faBackward;
  faForward = faForward;
  faStepForward = faStepForward;
  faPause = faPause;
  faVolumeDown = faVolumeDown;
  faVolumeMute = faVolumeMute;
  faVolumeUp = faVolumeUp;

  @Input() url = '/assets/Daf 18-with Rashi-2020.08.27.MP3';
  @ViewChild('audio') audioElementRef?: ElementRef<HTMLAudioElement>;

  currentLocation = '00:00';
  fastForwardAmount = 15;
  isLoading = true;
  paused = true;
  percentComplete = 0;
  rewindAmount = 15;
  totalLength = '00:00';
  volume = 50;

  private _currentTime: number = 0;
  private _duration: number = 0;

  updateDuration(d: Event) {
    const duration = (d.target as HTMLAudioElement).duration;
    this.totalLength = this.createTimeSpan(duration);
    this.isLoading = false;
    this._duration = duration;
  }

  updateTime(t: Event) {
    this.currentTime = (t.target as HTMLAudioElement).currentTime;
  }

  get currentTime(): number {
    return this._currentTime;
  }

  set currentTime(currentTime: number) {
    this._currentTime = currentTime;
    this.percentComplete = (currentTime / this._duration) * 100;
    this.currentLocation = this.createTimeSpan(currentTime);
  }

  slideTimeUpdate(t: Event) {
      this.currentTime = this._duration * (+(t.target as HTMLInputElement).value / 100);
  }

  togglePlay() {
    if (this.audioElementRef) {
      if (this.paused) {
        this.audioElementRef.nativeElement.play();
      } else {
          this.audioElementRef.nativeElement.pause();
      }

      this.paused = !this.paused;
    }
  }

  goToBeginning() {
      this.currentTime = 0;
  }

  fastForward() {
      this.currentTime = this.currentTime + this.fastForwardAmount;
  }

  rewind() {
      this.currentTime = this.currentTime - this.rewindAmount;
  }

  goToEnd() {
      this.currentTime = this._duration;
  }

  updateVolume(v: Event) {
      this.volume = +(v.target as HTMLInputElement).value;
  }

  startedPlaying() {
    this.paused = false;
  }

  onEnded() {
    this.paused = true;
  }

  //   // public percentLoaded() {
  //   //     for (let i = 0; i < this.audioElement.buffered.length; i++) {
  //   //         if (this.audioElement.buffered.start(this.audioElement.buffered.length - 1 - i) < this.audioElement.currentTime) {
  //   //             break;
  //   //         }
  //   //     }
  //   // }

  private previousVolume: number = 0;
  toggleVolume() {
      if (this.volume !== 0) {
          this.previousVolume = this.volume;
          this.volume = 0;
      } else{
          this.volume = this.previousVolume;
          this.previousVolume = 0;
      }
  }

  private createTimeSpan(timeInSeconds: number) {
      let minutes = Math.floor(timeInSeconds / 60);
      let seconds = Math.floor((timeInSeconds % 60));

      if (minutes >= 60) {
          let hours = Math.floor(minutes / 60);
          minutes = Math.floor(minutes % 60);
          return `${this.toFixedTimeString(hours)}:${this.toFixedTimeString(minutes)}:${this.toFixedTimeString(seconds)}`
      }

      return `${this.toFixedTimeString(minutes)}:${this.toFixedTimeString(seconds)}`;
  }

  private toFixedTimeString(timeUnit: number) {
      const timeUnitString = timeUnit.toFixed(0);
      return timeUnitString.length === 1 ? `0${timeUnitString}` : timeUnitString;
  }
}

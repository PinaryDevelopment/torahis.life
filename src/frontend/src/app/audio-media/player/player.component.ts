/*
    https://ilikekillnerds.com/category/aurelia-2/
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

  private _currentTime = 0;
  private _duration = 0;
  private _previousVolume = 0;

  updateDuration(d: Event): void {
    const duration = (d.target as HTMLAudioElement).duration;
    this.totalLength = this.createTimeSpan(duration);
    this.isLoading = false;
    this._duration = duration;
  }

  updateTime(t: Event): void {
    this._currentTime = (t.target as HTMLAudioElement).currentTime;
    this.updateTimeIndicators();
  }

  audioElementCurrentTimeSetter: number = 0;

  set currentTime(currentTime: number) {
    this._currentTime = currentTime;
    this.updateTimeIndicators();
  }

  slideTimeUpdate(t: Event): void {
      this.currentTime = this._duration * (+(t.target as HTMLInputElement).value / 100);
      this.audioElementCurrentTimeSetter = this._currentTime;
  }

  togglePlay(): void {
    if (this.audioElementRef) {
      if (this.paused) {
        this.audioElementRef.nativeElement.play();
      } else {
          this.audioElementRef.nativeElement.pause();
      }

      this.paused = !this.paused;
    }
  }

  goToBeginning(): void {
      this.currentTime = 0;
      this.audioElementCurrentTimeSetter = this._currentTime;
  }

  fastForward(): void {
      this.currentTime = this._currentTime + this.fastForwardAmount;
      this.audioElementCurrentTimeSetter = this._currentTime;
  }

  rewind(): void {
      this.currentTime = this._currentTime - this.rewindAmount;
      this.audioElementCurrentTimeSetter = this._currentTime;
  }

  goToEnd(): void {
      this.currentTime = this._duration;
      this.audioElementCurrentTimeSetter = this._currentTime;
  }

  updateVolume(v: Event): void {
      this.volume = +(v.target as HTMLInputElement).value;
  }

  startedPlaying(): void {
    this.paused = false;
  }

  onEnded(): void {
    this.paused = true;
  }

  // public percentLoaded() {
  //     for (let i = 0; i < this.audioElement.buffered.length; i++) {
  //         if (this.audioElement.buffered.start(this.audioElement.buffered.length - 1 - i) < this.audioElement.currentTime) {
  //             break;
  //         }
  //     }
  // }

  toggleVolume(): void {
      if (this.volume !== 0) {
          this._previousVolume = this.volume;
          this.volume = 0;
      } else{
          this.volume = this._previousVolume;
          this._previousVolume = 0;
      }
  }

  private updateTimeIndicators() {
    this.percentComplete = (this._currentTime / this._duration) * 100;
    this.currentLocation = this.createTimeSpan(this._currentTime);
  }

  private createTimeSpan(timeInSeconds: number): string {
      let minutes = Math.floor(timeInSeconds / 60);
      const seconds = Math.floor((timeInSeconds % 60));

      if (minutes >= 60) {
          const hours = Math.floor(minutes / 60);
          minutes = Math.floor(minutes % 60);
          return `${this.toFixedTimeString(hours)}:${this.toFixedTimeString(minutes)}:${this.toFixedTimeString(seconds)}`;
      }

      return `${this.toFixedTimeString(minutes)}:${this.toFixedTimeString(seconds)}`;
  }

  private toFixedTimeString(timeUnit: number): string {
      const timeUnitString = timeUnit.toFixed(0);
      return timeUnitString.length === 1 ? `0${timeUnitString}` : timeUnitString;
  }
}

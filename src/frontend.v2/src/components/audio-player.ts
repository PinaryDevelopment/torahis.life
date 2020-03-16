/* https://ilikekillnerds.com/category/aurelia-2/
   https://stackoverflow.com/questions/12325787/setting-the-granularity-of-the-html5-audio-event-timeupdate#comment-69606299
*/
import { inject, bindable } from 'aurelia';

@inject(Element)
export class AudioPlayer {

    private get currentTimeElement() {
        return this.element.querySelector<HTMLInputElement>('[title="location"]');
    }

    private set currentTime(currentTime: number) {
        this.currentTimeElement.value = ((currentTime / this.audioElement.duration) * 100).toString();
        this.currentLocation = this.createTimeSpan(currentTime);
    }

    @bindable public url: string;
    public audioElement: HTMLAudioElement;
    public totalLength = '00:00';
    public currentLocation = '00:00';
    public volume = 50;
    public fastForwardAmount = 15;
    public rewindAmount = 15;
    public isLoading = true;

    constructor(public element: Element) {
    }

    public updateDuration(audioElement: HTMLAudioElement) {
        if (audioElement.duration) {
            this.totalLength = this.createTimeSpan(audioElement.duration);
            this.isLoading = false;
        }
    }

    public updateCurrentTime(audioElement: HTMLAudioElement) {
        this.currentTime = audioElement.currentTime;
    }

    public slideTimeUpdate(percent: number) {
        this.currentTime = this.audioElement.duration * (percent / 100);
        this.audioElement.currentTime = this.audioElement.duration * (percent / 100);
    }

    public togglePlay() {
        if (this.audioElement.paused) {
            this.audioElement.play();
        } else {
            this.audioElement.pause();
        }
    }

    public goToBeginning() {
        this.currentTime = 0;
        this.audioElement.currentTime = 0;
    }

    public fastForward() {
        const currentTime = this.audioElement.currentTime;
        this.currentTime = currentTime + this.fastForwardAmount;
        this.audioElement.currentTime = currentTime + this.fastForwardAmount;
    }

    public rewind() {
        const currentTime = this.audioElement.currentTime;
        this.currentTime = currentTime - this.rewindAmount;
        this.audioElement.currentTime = currentTime - this.rewindAmount;
    }

    public goToEnd() {
        this.currentTime = this.audioElement.duration;
        this.audioElement.currentTime = this.audioElement.duration;
    }

    public updateVolume(volume: number) {
        this.audioElement.volume = volume / 100;
        this.volume = volume;
    }

    // public percentLoaded() {
    //     for (let i = 0; i < this.audioElement.buffered.length; i++) {
    //         if (this.audioElement.buffered.start(this.audioElement.buffered.length - 1 - i) < this.audioElement.currentTime) {
    //             break;
    //         }
    //     }
    // }

    private previousVolume: number;
    public toggleVolume() {
        if (this.volume !== 0) {
            this.previousVolume = this.volume;
            this.volume = 0;
        } else{
            this.volume = this.previousVolume;
            this.previousVolume = 0;
        }
    }

    private createTimeSpan(timeInSeconds: number) {
        let minutes = Math.floor((timeInSeconds / 60)).toFixed(0);
        let seconds = Math.floor((timeInSeconds % 60)).toFixed(0);
        minutes = minutes.length === 1 ? `0${minutes}` : minutes;
        seconds = seconds.length === 1 ? `0${seconds}` : seconds;
        return `${minutes}:${seconds}`;
    }
}

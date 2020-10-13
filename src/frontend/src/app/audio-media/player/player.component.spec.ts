import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AudioMediaPlayerComponent } from '@audio-media/index';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { getComponentPrivatePropertyValue, setComponentPrivateProperty } from '@testing/helper-functions';

describe('AudioMediaPlayerComponent', () => {
  let component: AudioMediaPlayerComponent;
  let fixture: ComponentFixture<AudioMediaPlayerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioMediaPlayerComponent ],
      imports: [
        FontAwesomeTestingModule,
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioMediaPlayerComponent);
    component = fixture.componentInstance;
  });

  describe('unit:ts', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should toggle volume', () => {
      expect(component.volume).toBe(50);

      component.toggleVolume();
      expect(component.volume).toBe(0);

      component.toggleVolume();
      expect(component.volume).toBe(50);
    });

    it('should toggle paused appropriately', () => {
      fixture.detectChanges();
      expect(component.paused).toBeTrue();

      component.startedPlaying();
      expect(component.paused).toBeFalse();

      component.onEnded();
      expect(component.paused).toBeTrue();

      component.togglePlay();
      expect(component.paused).toBeFalse();

      component.togglePlay();
      expect(component.paused).toBeTrue();
    });

    it('should update duration appropriately', () => {
      setComponentPrivateProperty(component, '_duration', 613);

      expect(component.audioElementCurrentTimeSetter).toBe(0);

      component.fastForward();
      expect(component.audioElementCurrentTimeSetter).toBe(15);

      component.goToEnd();
      expect(component.audioElementCurrentTimeSetter).toBe(613);

      component.rewind();
      expect(component.audioElementCurrentTimeSetter).toBe(598);

      component.goToBeginning();
      expect(component.audioElementCurrentTimeSetter).toBe(0);
    });

    it('should call play on native audio element when togglePlay() is invoked and paused is true', () => {
      fixture.detectChanges();
      if (!component.audioElementRef?.nativeElement) {
        fail();
      } else {
        component.paused = true;
        const playSpy = spyOn(component.audioElementRef.nativeElement, 'play');
        const pauseSpy = spyOn(component.audioElementRef.nativeElement, 'pause')
        component.togglePlay();
        expect(playSpy).toHaveBeenCalledTimes(1);
        expect(pauseSpy).not.toHaveBeenCalled();
      }
    });

    it('should call pause on native audio element when togglePlay() is invoked and paused is false', () => {
      fixture.detectChanges();
      if (!component.audioElementRef?.nativeElement) {
        fail();
      } else {
        component.paused = false;
        const playSpy = spyOn(component.audioElementRef.nativeElement, 'play');
        const pauseSpy = spyOn(component.audioElementRef.nativeElement, 'pause')
        component.togglePlay();
        expect(pauseSpy).toHaveBeenCalledTimes(1);
        expect(playSpy).not.toHaveBeenCalled();
      }
    });

    it('should update percentComplete when currentTime is set', () => {
      setComponentPrivateProperty(component, '_duration', 613);
      component.currentTime = 306.5;
      expect(component.percentComplete).toBe(50);
    });

    it('should update currentLocation when currentTime is set', () => {
      expect(component.currentLocation).toBe('00:00');

      component.currentTime = 59;
      expect(component.currentLocation).toBe('00:59');

      component.currentTime = 69;
      expect(component.currentLocation).toBe('01:09');

      component.currentTime = 3601;
      expect(component.currentLocation).toBe('01:00:01');
    });
  });

  describe('unit:DOM', () => {
    let audio: HTMLAudioElement;
    let controls: HTMLDivElement;
    let currentTime: HTMLInputElement;
    let duration: HTMLDivElement;
    let volume: HTMLDivElement;

    beforeEach(() => {
      audio = fixture.nativeElement.querySelector('audio');
      controls = fixture.nativeElement.querySelector('.controls');
      currentTime = fixture.nativeElement.querySelector('.current-time');
      duration = fixture.nativeElement.querySelector('.duration');
      volume = fixture.nativeElement.querySelector('.volume');
    });

    it('should invoke updateVolume() when volume input changes', () => {
      expect(component.volume).toBe(50);

      const updateVolumeSpy = spyOn(component, 'updateVolume').and.callThrough();
      const input = volume.querySelector('input');

      if (!input) {
        fail();
      } else {
        const inputEvent = new InputEvent('input');
        input.value = '75';
        input.dispatchEvent(inputEvent);

        expect(updateVolumeSpy).toHaveBeenCalledTimes(1);
        expect(updateVolumeSpy).toHaveBeenCalledWith(inputEvent);
        expect(component.volume).toBe(75);
      }
    });

    it('should invoke slideTimeUpdate() when current time input changes', () => {
      setComponentPrivateProperty(component, '_duration', 613);
      expect(component.audioElementCurrentTimeSetter).toBe(0);

      const slideTimeUpdateSpy = spyOn(component, 'slideTimeUpdate').and.callThrough();

      const inputEvent = new InputEvent('input');
      currentTime.value = '50';
      currentTime.dispatchEvent(inputEvent);

      expect(slideTimeUpdateSpy).toHaveBeenCalledTimes(1);
      expect(slideTimeUpdateSpy).toHaveBeenCalledWith(inputEvent);
      expect(component.audioElementCurrentTimeSetter).toBe(306.5);
    });

    it('should invoke updateTime() when timeupdate on audio element fires', () => {
      audio.currentTime = 613;
      const updateTimeSpy = spyOn(component, 'updateTime').and.callThrough();
      const updateTimeIndicatorsSpy = jasmine.spyOnPrivate(component, 'updateTimeIndicators').and.callThrough();

      const timeupdateEvent = new Event('timeupdate');
      audio.dispatchEvent(timeupdateEvent);

      expect(updateTimeIndicatorsSpy).toHaveBeenCalledTimes(1);
      expect(updateTimeSpy).toHaveBeenCalledTimes(1);
      expect(updateTimeSpy).toHaveBeenCalledWith(timeupdateEvent);
      expect(getComponentPrivatePropertyValue(component, '_currentTime')).toBe(613);
    });

    it('should invoke updateDuration() when durationchange on audio element fires', () => {
      expect(Number.isNaN(audio.duration)).toBeTrue();
      expect(getComponentPrivatePropertyValue(component, '_duration')).toBe(0);

      const updateDurationSpy = spyOn(component, 'updateDuration').and.callThrough();
      const createTimeSpanSpy = jasmine.spyOnPrivate(component, 'createTimeSpan').and.callThrough();

      const durationchangeEvent = new Event('durationchange');
      audio.dispatchEvent(durationchangeEvent);

      expect(createTimeSpanSpy).toHaveBeenCalledTimes(1);
      expect(updateDurationSpy).toHaveBeenCalledTimes(1);
      expect(updateDurationSpy).toHaveBeenCalledWith(durationchangeEvent);
      /* feels like a strange test
          but it is asserted as 0 above
          and duration on the audio component is readonly with a default value of NaN
          so this verifies that the firing of that event updates the private '_duration' property on the component
      */
      expect(Number.isNaN(getComponentPrivatePropertyValue(component, '_duration'))).toBeTrue();
    });

    it('should invoke onEnded() when ended on audio element fires', () => {
      const onEndedSpy = spyOn(component, 'onEnded').and.callThrough();

      const endedEvent = new Event('ended');
      audio.dispatchEvent(endedEvent);

      expect(onEndedSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke startedPlaying() when play on audio element fires', () => {
      const startedPlayingSpy = spyOn(component, 'startedPlaying').and.callThrough();

      const playEvent = new Event('play');
      audio.dispatchEvent(playEvent);

      expect(startedPlayingSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke startedPlaying() when playing on audio element fires', () => {
      const startedPlayingSpy = spyOn(component, 'startedPlaying').and.callThrough();

      const playingEvent = new Event('playing');
      audio.dispatchEvent(playingEvent);

      expect(startedPlayingSpy).toHaveBeenCalledTimes(1);
    });

    it('should disallow current time values out of valid range', () => {
      expect(currentTime.value).toBe('0');

      const inputEvent = new InputEvent('input');
      currentTime.value = '100.001';
      currentTime.dispatchEvent(inputEvent);
      expect(currentTime.value).toBe('100');

      currentTime.value = '-0.001';
      currentTime.dispatchEvent(inputEvent);
      expect(currentTime.value).toBe('0');
    });

    it('should display correct duration', () => {
      component.currentLocation = '00:53';
      component.totalLength = '01:01:01';
      fixture.detectChanges();

      expect(duration.textContent?.trim()).toBe(`00:53 - 01:01:01`);
    });

    it('should invoke goToBeginning() when click on go to beginning button', () => {
      const goToBeginningSpy = spyOn(component, 'goToBeginning').and.callThrough();

      const clickEvent = new MouseEvent('click');
      const goToBeginningButton = controls.querySelector('button[title="go to beginning"]');
      goToBeginningButton?.dispatchEvent(clickEvent);

      expect(goToBeginningSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke rewind() when click on seek backward button', () => {
      const rewindSpy = spyOn(component, 'rewind').and.callThrough();

      const clickEvent = new MouseEvent('click');
      const seekBackwardButton = controls.querySelector('button[title="seek backward"]');
      seekBackwardButton?.dispatchEvent(clickEvent);

      expect(rewindSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke togglePlay() when click on play button', () => {
      const togglePlaySpy = spyOn(component, 'togglePlay').and.callThrough();

      const clickEvent = new MouseEvent('click');
      const playButton = controls.querySelector('.play');
      playButton?.dispatchEvent(clickEvent);

      expect(togglePlaySpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke fastForward() when click on seek forward button', () => {
      const fastForwardSpy = spyOn(component, 'fastForward').and.callThrough();

      const clickEvent = new MouseEvent('click');
      const seekForwardButton = controls.querySelector('button[title="seek forward"]');
      seekForwardButton?.dispatchEvent(clickEvent);

      expect(fastForwardSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke goToEnd() when click on go to end button', () => {
      const goToEndSpy = spyOn(component, 'goToEnd').and.callThrough();

      const clickEvent = new MouseEvent('click');
      const goToEndButton = controls.querySelector('button[title="go to end"]');
      goToEndButton?.dispatchEvent(clickEvent);

      expect(goToEndSpy).toHaveBeenCalledTimes(1);
    });

    it('should invoke toggleVolume() when click on volume icon', () => {
      const toggleVolumeSpy = spyOn(component, 'toggleVolume').and.callThrough();

      const clickEvent = new MouseEvent('click');
      const volumeIcon = volume.querySelector('fa-icon');
      volumeIcon?.dispatchEvent(clickEvent);

      expect(toggleVolumeSpy).toHaveBeenCalledTimes(1);
    });

    it('should display mute volume icon', () => {
      component.volume = 0;
      fixture.detectChanges();
      const volumeIcon = volume.querySelector('fa-icon');
      const svgElement = volumeIcon?.querySelector('svg');
      expect(svgElement?.classList).toContain('fa-volume-mute');
    });

    it('should display volume down icon', () => {
      component.volume = 49;
      fixture.detectChanges();
      const volumeIcon = volume.querySelector('fa-icon');
      const svgElement = volumeIcon?.querySelector('svg');
      expect(svgElement?.classList).toContain('fa-volume-down');
    });

    it('should display volume up icon', () => {
      component.volume = 50;
      fixture.detectChanges();
      const volumeIcon = volume.querySelector('fa-icon');
      const svgElement = volumeIcon?.querySelector('svg');
      expect(svgElement?.classList).toContain('fa-volume-up');
    });
  });
});

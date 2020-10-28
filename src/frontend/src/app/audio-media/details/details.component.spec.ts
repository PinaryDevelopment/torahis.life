import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BehaviorSubject } from 'rxjs';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { AudioMediaDetailsComponent, AUDIO_MEDIA_TOKEN, AudioMediaPlayerComponent } from '@audio-media/index';
import { Contracts } from '@contracts/index';
import { AudioMedia } from '@contracts/app';

describe('AudioMediaDetailsComponent', () => {
  let component: AudioMediaDetailsComponent;
  let fixture: ComponentFixture<AudioMediaDetailsComponent>;
  let pager: HTMLDivElement;
  let previousButton: HTMLButtonElement | undefined;
  let nextButton: HTMLButtonElement | undefined;
  const audioMedia: Contracts.AudioMedia = {
    author: {
      id: 1,
      name: 'author'
    },
    date: new Date('10/08/2020'),
    id: 'id',
    series: 'series',
    title: 'title',
    versions: [{
      duration: 'duration',
      shiur: 'shiur',
      version: 'version'
    }],
    previousId: undefined,
    nextId: undefined
  };
  const audioMediaSubject = new BehaviorSubject<Contracts.AudioMedia | undefined>(undefined);

  describe('unit:DOM', () => {
    beforeEach(waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [
          AudioMediaDetailsComponent,
          AudioMediaPlayerComponent
        ],
        imports: [
          FontAwesomeTestingModule,
          RouterTestingModule
        ]
      })
      .overrideComponent(
        AudioMediaPlayerComponent,
        {
          set: {
            template: ''
          }
        }
      )
      .overrideComponent(
        AudioMediaDetailsComponent,
        {
          set: {
            providers: [
              { provide: AUDIO_MEDIA_TOKEN, useValue: audioMediaSubject.asObservable() }
            ]
          }
        }
      )
      .compileComponents();
    }));

    function updateAudioMedia(am: AudioMedia): void {
      audioMediaSubject.next(am);
      fixture.detectChanges();

      pager = fixture.nativeElement.querySelector('.pager');
      const buttons = pager.querySelectorAll('button');
      previousButton = undefined;
      nextButton = undefined;
      buttons.forEach(button => {
        const svgClassList = button.querySelector('svg')?.classList;
        switch (true) {
          case svgClassList?.contains('fa-long-arrow-alt-left'):
            previousButton = button;
            break;
          case svgClassList?.contains('fa-long-arrow-alt-right'):
            nextButton = button;
            break;
          default:
            break;
        }
      });
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(AudioMediaDetailsComponent);
      component = fixture.componentInstance;
      updateAudioMedia({...audioMedia});
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display title', () => {
      expect(fixture.nativeElement.querySelector('.title')?.textContent?.trim()).toBe(`${audioMedia.series} - ${audioMedia.title}`);
    });

    it('should display author', () => {
      expect(fixture.nativeElement.querySelector('.author')?.textContent?.trim()).toBe(`${audioMedia.author.name}`);
    });

    it('should display date', () => {
      expect(fixture.nativeElement.querySelector('.date')?.textContent?.trim()).toBe(`Thu Oct 08 2020`);
    });

    it('should not display next button', () => {
      expect(nextButton).toBeUndefined();
    });

    it('should not display previous button', () => {
      expect(previousButton).toBeUndefined();
    });

    it('should display previous button to left of next button', () => {
      const am = {...audioMedia};
      am.nextId = 5;
      am.previousId = 3;
      updateAudioMedia(am);

      if (!previousButton || !nextButton) {
        fail();
      } else {
        expect(previousButton).toBeLeftOf(nextButton);
      }
    });

    it('should display previous button', () => {
      const am = {...audioMedia};
      am.previousId = 3;
      updateAudioMedia(am);

      if (!previousButton) {
        fail();
      } else {
        expect(previousButton.textContent?.trim()).toBe('Previous');
      }
    });

    it('should display next button', () => {
      const am = {...audioMedia};
      am.nextId = 5;
      updateAudioMedia(am);

      if (!nextButton) {
        fail();
      } else {
        expect(nextButton.textContent?.trim()).toBe('Next');
      }
    });

    it('should display correct previous anchor link', () => {
      const am = {...audioMedia};
      am.previousId = 3;
      updateAudioMedia(am);

      if (!previousButton) {
        fail();
      } else {
        expect(previousButton.getAttribute('ng-reflect-router-link')).toBe('../,3');
      }
    });

    it('should display correct next anchor link', () => {
      const am = {...audioMedia};
      am.nextId = 5;
      updateAudioMedia(am);

      if (!nextButton) {
        fail();
      } else {
        expect(nextButton.getAttribute('ng-reflect-router-link')).toBe('../,5');
      }
    });
  });
});

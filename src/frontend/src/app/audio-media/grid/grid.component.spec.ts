import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';

import { AudioMediaGridComponent } from '@audio-media/index';
import { Contracts } from '@contracts/index';
import { CardComponent } from 'src/app/shared/card/card.component';

describe('AudioMediaGridComponent', () => {
  let component: AudioMediaGridComponent;
  let fixture: ComponentFixture<AudioMediaGridComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AudioMediaGridComponent,
        CardComponent
      ],
      imports: [
        FontAwesomeTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioMediaGridComponent);
    component = fixture.componentInstance;
  });

  describe('unit:DOM', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('empty collection', () => {
      it('should display no cards', () => {
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('pd-card')).toBeNull();
      });
    });

    describe('non-empty collection', () => {
      it('should display n cards', () => {
        component.collection = [{} as Contracts.AudioMedia, {} as Contracts.AudioMedia];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('pd-card').length).toBe(2);
      });
    });

    describe('card contents', () => {
      let card: HTMLElement;
      const audioMedia = {
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
        }]
      };

      beforeEach(() => {
        component.collection = [audioMedia];

        fixture.detectChanges();
        card = fixture.nativeElement.querySelector('pd-card');
      });

      it('should display title', () => {
        expect(card.querySelector('.title')?.textContent?.trim()).toBe(`${audioMedia.series} - ${audioMedia.title}`);
      });

      it('should display author', () => {
        expect(card.querySelector('.author')?.textContent?.trim()).toBe(`${audioMedia.author.name}`);
      });

      it('should display date', () => {
        expect(card.querySelector('.date')?.textContent?.trim()).toBe(`Thu Oct 08 2020`);
      });

      it('should display version anchor', () => {
        const version = card.querySelector('.version');
        const anchor = version?.querySelector('a');
        expect(anchor?.textContent?.trim()).toBe(`${audioMedia.versions[0].version} (${audioMedia.versions[0].duration})`);
      });

      it('should display correct anchor link', () => {
        const version = card.querySelector('.version');
        const anchor = version?.querySelector('a');

        if (!anchor) {
          fail();
        } else {
          expect(/http:\/\/localhost:[0-9]*(.)*/.test(anchor.href)).toBeTrue();
          expect(anchor.href.endsWith(`/audio/${audioMedia.id}`)).toBeTrue();
        }
      });
    });
  });
});

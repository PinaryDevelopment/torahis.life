import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { IndexComponent } from '@home/index';
import { AudioMediaGridComponent, AUDIO_MEDIA_COLLECTION_TOKEN } from '@audio-media/index';

describe('IndexComponent', () => {
  let fixture: ComponentFixture<IndexComponent>;
  let component: IndexComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        IndexComponent,
        AudioMediaGridComponent
      ]
    }).overrideComponent(
      IndexComponent,
      {
        set: {
          providers: [
            { provide: AUDIO_MEDIA_COLLECTION_TOKEN, useValue: [] }
          ]
        }
      }
    ).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
  });

  describe('unit:ts', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('unit:DOM', () => {
    let section: HTMLElement;

    beforeEach(() => {
      section = fixture.nativeElement.querySelector('section');
    });

    it('should display section text', () => {
      expect(section.textContent?.trim()).toBe(`Welcome to Torah is Life, your home for quality torah content.`)
    });
  });
});

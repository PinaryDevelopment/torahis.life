import { TestBed, async } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { IndexComponent } from './index.component';
import { AUDIO_MEDIA_COLLECTION_TOKEN } from '../../audio-media/audio-media.providers';

describe('IndexComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
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

  it('should create the component', () => {
    const fixture = TestBed.createComponent(IndexComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});

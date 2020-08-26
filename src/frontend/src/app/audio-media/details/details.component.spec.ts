import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AudioMediaDetailsComponent } from './details.component';
import { AudioMediaModule } from '../audio-media.module';
import { AUDIO_MEDIA_TOKEN } from '../audio-media.providers';
import { of } from 'rxjs';

describe('AudioMediaDetailsComponent', () => {
  let component: AudioMediaDetailsComponent;
  let fixture: ComponentFixture<AudioMediaDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AudioMediaModule ]
    }).overrideComponent(
      AudioMediaDetailsComponent,
      {
        set: {
          providers: [
            { provide: AUDIO_MEDIA_TOKEN, useValue: of({versions:[{version:''}],author:{},date:new Date(Date.now())}) }
          ]
        }
      }
    )
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioMediaDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

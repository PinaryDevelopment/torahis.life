import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AudioMediaGridComponent } from './grid.component';

describe('AudioMediaGridComponent', () => {
  let component: AudioMediaGridComponent;
  let fixture: ComponentFixture<AudioMediaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudioMediaGridComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioMediaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Location } from '@angular/common';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { routes } from './app-routing.module'
import { IndexComponent, RootComponent } from '@home/index';
import { AudioMediaGridComponent } from '@audio-media/index';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';

describe('Router: App', () => {
  let location: Location;
  let router: Router;
  let fixture: ComponentFixture<RootComponent>;
  let zone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FontAwesomeTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        IndexComponent,
        RootComponent,
        AudioMediaGridComponent
      ]
    })
    .overrideComponent(AudioMediaGridComponent, { set: { template: '' } });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    zone = TestBed.inject(NgZone);

    fixture = TestBed.createComponent(RootComponent);
    zone.run(() => router.initialNavigation());
  });

  describe('unit:ts', () => {
    it('navigate to "" redirects you to /index', done => {
      zone.run(
        () => router.navigate([''])
                    .then(() => {
                      expect(location.path()).toBe('/index');
                      done();
                    })
      );
    });

    it('navigate to "index" takes you to /index', done => {
      zone.run(
        () => router.navigate(['index'])
                    .then(() => {
                      expect(location.path()).toBe('/index');
                      done();
                    })
      );
    });

    it('navigate to "audio" takes you to /audio', done => {
      zone.run(
        () => router.navigate(['audio'])
                    .then(() => {
                      expect(location.path()).toBe('/audio');
                      done();
                    })
      );
    });

    it('navigate to "audio/*" takes you to /audio/*', done => {
      const randomString = Math.random().toString(36).substring(2);
      zone.run(
        () => router.navigate(['audio', randomString])
                    .then(() => {
                      expect(location.path()).toBe(`/audio/${randomString}`);
                      done();
                    })
      );
    });
  });
});

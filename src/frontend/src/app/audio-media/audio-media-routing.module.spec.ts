import { CommonModule, Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { routes } from './audio-media-routing.module';
import { RootComponent } from '@home/index';
import { AudioMediaDetailsComponent } from '@audio-media/index';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgZone } from '@angular/core';

describe('Router: Audio Media', () => {
  let location: Location;
  let router: Router;
  let zone: NgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        FontAwesomeTestingModule,
        HttpClientTestingModule,
        CommonModule
      ],
      declarations: [
        RootComponent,
        AudioMediaDetailsComponent
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    zone = TestBed.inject(NgZone);

    zone.run(() => router.initialNavigation());
  });

  describe('unit:ts', () => {
    it('navigate to "*" takes you to /*', done => {
      const randomString = Math.random().toString(36).substring(2);
      zone.run(
        () => router.navigate([randomString])
                    .then(() => {
                      expect(location.path()).toBe(`/${randomString}`);
                      done();
                    })
      );
    });
  });
});

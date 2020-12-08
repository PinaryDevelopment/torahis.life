import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CanActivate, Router } from '@angular/router';

import { routes } from './app-routing.module';
import { IndexComponent, RootComponent } from '@home/index';
import { AudioMediaGridComponent } from '@audio-media/index';
import { FontAwesomeTestingModule } from '@fortawesome/angular-fontawesome/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injectable, NgZone } from '@angular/core';
import { AuthGuard } from '@auth/auth.guard';

@Injectable()
export class FakeAuthGuard implements CanActivate {
  canActivate(): boolean {
    return true;
  }
}

describe('Router: App', () => {
  let location: Location;
  let router: Router;
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
    .overrideComponent(AudioMediaGridComponent, { set: { template: '' } })
    .overrideProvider(AuthGuard, { useFactory: () => new FakeAuthGuard() });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    zone = TestBed.inject(NgZone);

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

    it('navigate to "login" takes you to /login', done => {
      zone.run(
        () => router.navigate(['login'])
                    .then(() => {
                      expect(location.path()).toBe('/login');
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

    it('navigate to "admin" takes you to /admin/audio-media-form', done => {
      zone.run(
        () => router.navigate(['admin'])
                    .then(() => {
                      expect(location.path()).toBe('/admin/audio-media-form');
                      done();
                    })
      );
    });

    it('navigate to "admin/*" takes you to /admin/audio-media-form/*', done => {
      const randomString = Math.random().toString(36).substring(2);
      zone.run(
        () => router.navigate(['admin', 'audio-media-form', randomString])
                    .then(() => {
                      expect(location.path()).toBe(`/admin/audio-media-form/${randomString}`);
                      done();
                    })
      );
    });
  });
});

/* https://netbasal.com/environment-based-dead-code-elimination-in-angular-54eec1f92a65 */
declare const ngDevMode: boolean;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Provider } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { IndexComponent, RootComponent } from './home';

import { AudioMediaGridComponent } from './audio-media';
import { LoginComponent } from './auth/login/login.component';

import { SharedModule } from './shared/shared.module';

import { apiStubProvider } from '@testing/fakes/api.stub';
import { NavigationStart, Router } from '@angular/router';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '@auth/auth.service';

const providers: Provider[] = [];
if (ngDevMode) {
  providers.push(apiStubProvider);
}

@NgModule({
  declarations: [
    RootComponent,
    IndexComponent,
    LoginComponent,
    AudioMediaGridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers,
  bootstrap: [RootComponent]
})
export class AppModule {
  constructor(
    router: Router,
    authService: AuthService
  ) {
    router.events
          .pipe(
            filter(evt => evt instanceof NavigationStart),
            map(evt => router.parseUrl((evt as NavigationStart).url)),
            tap(evt => console.log(evt)),
            filter(urlTree => urlTree.fragment !== null),
            switchMap(urlTree => authService.login(urlTree.fragment as string)),
            tap(() => router.navigateByUrl('/admin')),
            take(1)
          )
          .subscribe();
  }
}

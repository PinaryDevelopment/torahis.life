import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import {
  IndexComponent,
  RootComponent
} from './home';

import { AudioMediaGrid } from './audio-media';

import { SharedModule } from './shared/shared.module';

import { apiStubProvider } from './fakes/api.stub';

@NgModule({
  declarations: [
    RootComponent,
    IndexComponent,
    AudioMediaGrid
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    apiStubProvider
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}

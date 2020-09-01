import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioMediaRoutingModule } from './audio-media-routing.module';
import { AudioMediaDetailsComponent } from './details/details.component';
import { AudioMediaPlayerComponent } from './player/player.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AudioMediaDetailsComponent,
    AudioMediaPlayerComponent
  ],
  imports: [
    AudioMediaRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class AudioMediaModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AudioMediaRoutingModule } from './audio-media-routing.module';
import { AudioMediaDetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AudioMediaDetailsComponent
  ],
  imports: [
    AudioMediaRoutingModule,
    CommonModule
  ]
})
export class AudioMediaModule {}

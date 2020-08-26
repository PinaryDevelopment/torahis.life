import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudioMediaDetailsComponent } from './details/details.component';

const routes: Routes = [
  { path: ':id', component: AudioMediaDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudioMediaRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@auth/auth.guard';
import * as Components from './';

const routes: Routes = [
  {
    path: '',
    component: Components.DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'audio-media-form',
        component: Components.AudioMediaFormComponent
      },
      {
        path: 'audio-media-form/:id',
        component: Components.AudioMediaFormComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'audio-media-form',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

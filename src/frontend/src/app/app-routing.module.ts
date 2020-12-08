import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '@auth/login/login.component';

import { IndexComponent } from './home';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'audio', pathMatch: 'prefix', loadChildren: () => import('./audio-media/audio-media.module').then(m => m.AudioMediaModule) },
  { path: 'admin', pathMatch: 'prefix', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

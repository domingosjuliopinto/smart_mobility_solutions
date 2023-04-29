import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomePageModule) },
  { path: 'tabs', loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule) },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupPageModule) },
  { path: 'accessdenied', redirectTo: '', pathMatch: 'full' },  {
    path: 'track',
    loadChildren: () => import('./pages/track/track.module').then( m => m.TrackPageModule)
  },

];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeatureModuleComponent } from './feature-module.component';
import { AuthService } from '../core/services/auth/auth.service';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FeatureModuleComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },  
      {
        path: 'tracking',
        canActivate: [AuthService],
        loadChildren: () =>
          import('./tracking/tracking.module').then(m => m.TrackingModule)
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./auth/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordModule
      ),
  },
  {
    path: 'otp',
    loadChildren: () =>
      import('./auth/otp/otp.module').then((m) => m.OtpModule),
  },
  {
    path: 'lock-screen',
    loadChildren: () =>
      import('./auth/lock-screen/lock-screen.module').then(
        (m) => m.LockScreenModule
      ),
  },
  {
    path: '404',
    loadChildren: () =>
      import('./auth/error404/error404.module').then((m) => m.Error404Module),
  },
  {
    path: '500',
    loadChildren: () =>
      import('./auth/error500/error500.module').then((m) => m.Error500Module),
  },
  { path: 'tracting', loadChildren: () => import('./tracking/tracking.module').then(m => m.TrackingModule) },
  { path: '**', redirectTo: 'admin/404' },
   
  




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeatureModuleRoutingModule { }

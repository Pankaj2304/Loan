import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'user-list',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'internal-user-list',
        loadChildren: () =>
          import('./internal-users/user.module').then((m) => m.UserModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'login-form',
        loadChildren: () =>
          import('./pages/authendication/login/login.module').then(
            (m) => m.LoginModule
          ),
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}

import { GuardService } from './core/services/guard.service';
import { NavComponent } from './shared/component/nav/nav.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        canActivate: [GuardService],
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [GuardService],
        loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'user',
        canActivate: [GuardService],
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'client',
        canActivate: [GuardService],
        loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'role',
        canActivate: [GuardService],
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      },
      {
        path: 'art',
        canActivate: [GuardService],
        loadChildren: () => import('./pages/art/art.module').then(m => m.ArtModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

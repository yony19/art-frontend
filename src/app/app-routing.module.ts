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
        redirectTo: '/user',
        pathMatch: 'full',
      },
      {
        path: 'user',
        loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'client',
        loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'rol',
        loadChildren: () => import('./pages/roles/roles.module').then(m => m.RolesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

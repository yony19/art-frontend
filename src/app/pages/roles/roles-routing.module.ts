
import { NavComponent } from './../../shared/component/nav/nav.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { RolesListComponent } from './components/roles-list/roles-list.component';

const routes: Routes = [
    {
        path: '',
        component: RolesListComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RolesRoutingModule { }

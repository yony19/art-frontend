import { ClientListComponent } from './components/client-list/client-list.component';
import { NavComponent } from './../../shared/component/nav/nav.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CreateClientComponent } from './components/create-client/create-client.component';

const routes: Routes = [
    {
        path: '',
        component: ClientListComponent,
        /* children: [
            {
                path: 'create-client',
                component: CreateClientComponent
            }
        ] */
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule { }

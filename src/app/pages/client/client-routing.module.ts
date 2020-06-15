import { ClientListComponent } from './components/client-list/client-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

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

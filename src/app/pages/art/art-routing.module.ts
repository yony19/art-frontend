import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ArtListComponent } from './components/art-list/art-list.component';

const routes: Routes = [
    {
        path: '',
        component: ArtListComponent,
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
export class ArtRoutingModule { }

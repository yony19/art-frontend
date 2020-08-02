import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SubClientListComponent } from './components/sub-client-list/sub-client-list.component';
import { SubClientCreateComponent } from './components/sub-client-create/sub-client-create.component';

const routes: Routes = [
    {
        path: '',
        component: SubClientListComponent,
    },
    {
        path: 'form',
        component: SubClientCreateComponent,
    },
    {
        path: 'form/:id',
        component: SubClientCreateComponent,
    }
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SubClientRoutingModule { }

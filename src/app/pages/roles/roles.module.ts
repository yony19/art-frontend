import { CrudRoleDialogComponent } from './components/roles-list/crud-role-dialog/crud-role-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesListComponent } from './components/roles-list/roles-list.component';
import { RolesRoutingModule } from './roles-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateRolesComponent } from './components/create-roles/create-roles.component';



@NgModule({
  declarations: [RolesListComponent, CreateRolesComponent, CrudRoleDialogComponent],
  entryComponents: [CrudRoleDialogComponent],
  imports: [
    CommonModule,
    RolesRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class RolesModule { }

import { ReactiveFormsModule } from '@angular/forms';
import { UserListComponent } from './components/user-list/user-list.component';
import { CrudDialogComponent } from './components/user-list/crud-dialog/crud-dialog.component';
import { MaterialModule } from './../../material/material.module';
import { NavComponent } from './../../shared/component/nav/nav.component';
import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NavComponent, UserListComponent, CrudDialogComponent],
  entryComponents: [CrudDialogComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class UserModule { }

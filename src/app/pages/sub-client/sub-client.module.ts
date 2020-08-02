import { SubClientCreateComponent } from './components/sub-client-create/sub-client-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { SubClientRoutingModule } from './sub-client-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubClientListComponent } from './components/sub-client-list/sub-client-list.component';

@NgModule({
  declarations: [SubClientListComponent, SubClientCreateComponent],
  imports: [
    CommonModule,
    SubClientRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SubClientModule { }

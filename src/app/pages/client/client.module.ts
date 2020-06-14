import { ClientRoutingModule } from './client-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListComponent } from './components/client-list/client-list.component';
import { CreateClientComponent } from './components/create-client/create-client.component';



@NgModule({
  declarations: [ClientListComponent, CreateClientComponent],
  entryComponents: [CreateClientComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ClientModule { }

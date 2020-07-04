import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtListComponent } from './components/art-list/art-list.component';
import { ArtRoutingModule } from './art-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ArtListComponent],
  imports: [
    CommonModule,
    ArtRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class ArtModule { }

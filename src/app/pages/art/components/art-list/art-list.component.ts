import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Person } from './../../../../core/models/person.model';
import { MatTableDataSource } from '@angular/material/table';
import { PersonService } from './../../../../core/services/person.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-art-list',
  templateUrl: './art-list.component.html',
  styleUrls: ['./art-list.component.css']
})
export class ArtListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombreCompleto', 'email', 'phone', 'acciones'];
  columnsToDisplay: string[] = this.displayedColumns.slice();

  dataSource: MatTableDataSource<Person>;
  arteForm: FormGroup;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;
  mensaje: string;
  isOpenForm: boolean = false;
  redName: string;
  constructor(private personService: PersonService,
    private snackBar: MatSnackBar,
    private _formBuilder: FormBuilder) {
      this.buildFomArte();
    }

  ngOnInit(): void {
    this.personService.getAllPersons().subscribe(users => {
      this.cantidad = users.length;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    });
    this.personService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000});
    });
  }

  mostrarMas(event) {

  }

  applyFilter(value: string) {

  }

  onFileSelected() {

  }

  openForm(red) {
    this.redName = red;
    this.isOpenForm = true;
  }

  private buildFomArte() {
    this.arteForm = this._formBuilder.group({ 
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      file: [''],
      date: ['', Validators.required]
    });
  }
}

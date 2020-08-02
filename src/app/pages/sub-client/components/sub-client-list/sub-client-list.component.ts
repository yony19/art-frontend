import { Person } from './../../../../core/models/person.model';
import { PersonService } from './../../../../core/services/person.service';
import { Respuesta } from './../../../../core/models/respuesta.model';
import { UserDto } from './../../../../core/dto/userDto.model';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sub-client-list',
  templateUrl: './sub-client-list.component.html',
  styleUrls: ['./sub-client-list.component.css']
})
export class SubClientListComponent implements OnInit {

  displayedColumns = ['id', 'name', 'lastname', 'gender', 'email', 'phone', 'acciones'];
  dataSource: MatTableDataSource<Person>;
  cantidad: number;
  mensaje: string;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private personService: PersonService, 
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.personService.getAllPersons().subscribe(users => {
      this.cantidad = users.length;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    });

    this.personService.personCambio.subscribe((gpersons: Person[]) => {

      this.dataSource = new MatTableDataSource(gpersons);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

    this.personService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000});
    });
  }

  mostrarMas(e) {

  }

  eliminar(user: Person) {
    this.personService.deletePerson(user.id).subscribe((response: Respuesta) => {
      if (!response.error) {
        this.personService.getAllPersons().subscribe((gpersons: Person[]) => {
          this.personService.personCambio.next(gpersons);
          this.personService.mensaje.next("Se eliminó correctamente.");
        });
      } else {
        this.personService.mensaje.next(response.message);
      }
    });
  }

}

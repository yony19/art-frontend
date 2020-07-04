import { Respuesta } from './../../../../core/models/respuesta.model';
import { CrudDialogComponent } from './crud-dialog/crud-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserDto } from './../../../../core/dto/userDto.model';
import { UserService } from './../../../../core/services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  displayedColumns = ['id', 'name', 'lastname', 'gender', 'email', 'phone', 'acciones'];
  dataSource: MatTableDataSource<UserDto>;
  cantidad: number;
  mensaje: string;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public dialog: MatDialog
    ) {}

  ngOnInit() {
    this.userService.getAllUser().subscribe(users => {
      this.cantidad = users.length;
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    });

    this.userService.userCambio.subscribe((usersDto: UserDto[]) => {

      this.dataSource = new MatTableDataSource(usersDto);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

    this.userService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000});
    });
  }

  openDialog(userDto: UserDto): void  {
    console.log("llega");
    let user = userDto != null ? userDto : new UserDto();
    let dialogRef = this.dialog.open(CrudDialogComponent, {
      //data: { sdad: ""}
      height: '500px',
      width: '520px',
      data: user
    });
  }

  mostrarMas(e) {

  }

  eliminar(user: UserDto) {
    this.userService.deleteUser(user.id).subscribe((response: Respuesta) => {
      if (!response.error) {
        this.userService.getAllUser().subscribe((users: UserDto[]) => {
          this.userService.userCambio.next(users);
          this.userService.mensaje.next("Se modificó correctamente.");
        });
      } else {
        this.userService.mensaje.next(response.message);
      }
    });
  }
}

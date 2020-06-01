import { UserService } from './../../../../core/services/user.service';
import { UserDto } from './../../../../core/dto/userDto.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit {

  displayedColumns = ['id', 'name', 'lastname', 'gender', 'email', 'phone', 'acciones'];
  dataSource: MatTableDataSource<UserDto>;
  cantidad: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(
    private userService: UserService, 
    private snackBar: MatSnackBar,
    public route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.userService.getAllUser().subscribe(users => {
        console.log(users);
      this.cantidad = users.length;
      console.log(this.cantidad);
      
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
    });
  }

  mostrarMas(e) {

  }

  eliminar(row: UserDto) {

  }
}

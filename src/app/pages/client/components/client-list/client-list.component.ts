import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientService } from 'src/app/core/services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientComponent } from '../create-client/create-client.component';
import { Client } from 'src/app/core/models/client.model';
import { ClientDto } from 'src/app/core/dto/clientDto.model';
import { Respuesta } from 'src/app/core/models/respuesta.model';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'business_name', 'nuit', 'address', 'phone', 'enabled', 'acciones'];
  dataSource: MatTableDataSource<Client>;
  cantidad: number;
  mensaje: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clientService: ClientService, 
    private snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.clientService.getAllClients().subscribe(client => {
      this.cantidad = client.length;
      this.dataSource = new MatTableDataSource(client);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.clientService.clientCambio.subscribe((usersDto: Client[]) => {

      this.dataSource = new MatTableDataSource(usersDto);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

    this.clientService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000});
    });
  }

  openDialog(userDto: Client): void  {
    console.log("llega");
    let user = userDto != null ? userDto : new ClientDto();
    let dialogRef = this.dialog.open(CreateClientComponent, {
      //data: { sdad: ""}
      height: '500px',
      data: user
    });
  }

  
  openUpdate(client: Client): void  {
    console.log("llega");
    let user = client != null ? client : new ClientDto();
    let dialogRef = this.dialog.open(CreateClientComponent, {
      //data: { sdad: ""}
      height: '500px',
      data: user
    });
  }

  eliminar(client: Client): void {
    this.clientService.delete(client.id).subscribe((response: Respuesta) => {
      if (!response.error) {
        this.clientService.getAllClients().subscribe((users: Client[]) => {
          this.clientService.clientCambio.next(users);
          this.clientService.mensaje.next("Se modificó correctamente.");
        });
      } else {
        this.clientService.mensaje.next(response.message);
      }
    });
  }

}

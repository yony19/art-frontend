import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClientDto } from 'src/app/core/dto/clientDto.model';
import { ClientService } from 'src/app/core/services/client.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientComponent } from '../create-client/create-client.component';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'business_name', 'nuit', 'address', 'phone', 'enabled'];
  dataSource: MatTableDataSource<ClientDto>;
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
      this.dataSource.sort = this.sort;
    });
  }

  openDialog(clientDto: ClientDto): void  {
    console.log("llega");
    let client = clientDto != null ? clientDto : new ClientDto();
    let dialogRef = this.dialog.open(CreateClientComponent, {
      height: '500px',
      data: client
    });
  }

}

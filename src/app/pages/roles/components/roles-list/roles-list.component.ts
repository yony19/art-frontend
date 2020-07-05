import { Respuesta } from './../../../../core/models/respuesta.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { CrudRoleDialogComponent } from './crud-role-dialog/crud-role-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RoleService } from './../../../../core/services/role.service';
import { Role } from './../../../../core/models/role.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.css']
})


export class RolesListComponent  implements OnInit{

  displayedColumns: string[] = ['select', 'id', 'name', 'description', 'level', 'acciones'];
  dataSource: MatTableDataSource<Role> = new MatTableDataSource<Role>();
  selection = new SelectionModel<Role>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;
  mensaje: string;

  constructor(
    private roleService: RoleService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }
  ngOnInit() {
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      this.cantidad = roles.length;
      this.dataSource = new MatTableDataSource(roles);
      this.dataSource.sort = this.sort;
    });

    this.roleService.roleCambio.subscribe((roles: Role[]) => {
      this.dataSource = new MatTableDataSource(roles);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

    this.roleService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000});
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Role): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
  
  openDialog(role: Role): void  {
    let user = role != null ? role : new Role();
    
    let dialogRef = this.dialog.open(CrudRoleDialogComponent, {
      //data: { sdad: ""}
      height: '500px',
      width: '520px',
      data: user
    });
  }

  eliminar(role: Role) {
    this.roleService.delete(role.id).subscribe((response: Respuesta) => {
      if (!response.error) {
        this.roleService.getAllRoles().subscribe((roles: Role[]) => {
          this.roleService.roleCambio.next(roles);
          this.roleService.mensaje.next("Se modificó correctamente.");
        });
      } else {
        this.roleService.mensaje.next(response.message);
      }
    });
  }

  mostrarMas(e) {

  }

}

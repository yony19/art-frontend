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

  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol'];
  dataSource: MatTableDataSource<Role> = new MatTableDataSource<Role>();
  selection = new SelectionModel<Role>(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  cantidad: number;
  mensaje: string;

  constructor(
    private roleService: RoleService,
    public dialog: MatDialog
  ) {

  }
  ngOnInit() {
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      this.cantidad = roles.length;
      this.dataSource = new MatTableDataSource(roles);
      this.dataSource.sort = this.sort;
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
}

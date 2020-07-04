import { Respuesta } from 'src/app/core/models/respuesta.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from './../../../../../core/services/role.service';
import { Role } from './../../../../../core/models/role.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-crud-role-dialog',
  templateUrl: './crud-role-dialog.component.html',
  styleUrls: ['./crud-role-dialog.component.css']
})
export class CrudRoleDialogComponent implements OnInit {

  public roleForm: FormGroup;
  public is_crate: boolean;
  
  constructor(
    public dialogRef: MatDialogRef<CrudRoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public role: Role,
    private roleService: RoleService,
    private _formBuilder: FormBuilder
  ) {
    
    this.buildFomDatosClients();
  }

  ngOnInit(): void {
    if (typeof this.role.id === "undefined") {
      this.is_crate = true;
    }

    if (!this.is_crate) {
      this.roleForm.patchValue(this.role);
    }
  }

  onSubmit() {
    let role = new Role();
    role.name = this.roleForm.value['name'];
    role.description = this.roleForm.value['description'];
    role.locked = this.roleForm.value['locked'];
    role.level = this.roleForm.value['level'];
    role.enabled = this.roleForm.value['enabled'];

    if (!this.is_crate) {
      role.id = this.role.id;
      this.roleService.update(this.role.id, role).subscribe((response: Respuesta)=> {
        if (!response.error) {
          this.roleService.getAllRoles().subscribe(role => {
            this.roleService.roleCambio.next(role);
            this.roleService.mensaje.next("Se modificó correctamente.");
            this.cancelar();
          });
        } else {
          this.roleService.mensaje.next(response.message);
        }
      });
    } else {
      this.roleService.create(role).subscribe((response: Respuesta) => {
        if (!response.error) {
          this.roleService.getAllRoles().subscribe((role: Role[]) => {
            this.roleService.roleCambio.next(role);
            this.roleService.mensaje.next("Se creo correctamente.");
            this.cancelar();
          });
        } else {
          this.roleService.mensaje.next(response.message);
        }
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }

  private buildFomDatosClients() {
    this.roleForm = this._formBuilder.group({ 
      id: [''],
      name: ['', Validators.required],
      description: ['', Validators.required],
      level: [''],
      enabled: [true],
      locked: [true],
    });
  }

}

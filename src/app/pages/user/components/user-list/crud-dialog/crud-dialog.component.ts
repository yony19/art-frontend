import { UserService } from './../../../../../core/services/user.service';
import { UserDto } from './../../../../../core/dto/userDto.model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-dialog',
  templateUrl: './crud-dialog.component.html',
  styleUrls: ['./crud-dialog.component.css']
})
export class CrudDialogComponent implements OnInit {

  datoPersonalFormGroup: FormGroup;
  usuarioFormGroup: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<CrudDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userDto: UserDto,
    private userService: UserService,
    private _formBuilder: FormBuilder
  ) { 
    this.buildFomDatosPersonales();
    this.buidFormUsuario();
  }

  ngOnInit(): void {
    
  }

  guardarTodo() {
    alert("Guardado");
  }

  private buildFomDatosPersonales() {
    this.datoPersonalFormGroup = this._formBuilder.group({ 
      id: [''],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      gender: [''],
      email: ['', Validators.required],
      phone: [''],
      avatar_url: [''],
      locked: [''],
      visible: [''],
      clients_id: ['']
    });
  }

  private buidFormUsuario() {
    this.usuarioFormGroup = this._formBuilder.group({
      id: [''],
      password: ['', Validators.required],
      persons_id: [''],
    });
  }

}

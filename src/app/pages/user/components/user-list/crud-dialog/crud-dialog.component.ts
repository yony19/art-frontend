import { Respuesta } from './../../../../../core/models/respuesta.model';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  esNuevo: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<CrudDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public userDto: UserDto,
    private userService: UserService,
    private _formBuilder: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    
    this.buildFomDatosPersonales();
    this.buidFormUsuario();
  }

  ngOnInit(): void {
    if (typeof this.userDto.id === "undefined") {
      this.esNuevo = true;
    }
    if (!this.esNuevo) {
      this.datoPersonalFormGroup.patchValue(this.userDto);
      this.usuarioFormGroup.get('password').clearValidators();
      this.usuarioFormGroup.get('password').updateValueAndValidity();  
    }
    
  }

  guardarTodo() {
    let userDto = new UserDto();
    userDto.avatar_url = this.datoPersonalFormGroup.value['avatar_url'];
    userDto.email = this.datoPersonalFormGroup.value['email'];
    userDto.gender = this.datoPersonalFormGroup.value['gender'];
    userDto.name = this.datoPersonalFormGroup.value['name'];
    userDto.lastname = this.datoPersonalFormGroup.value['lastname'];
    userDto.phone = this.datoPersonalFormGroup.value['phone'];
    userDto.locked = this.datoPersonalFormGroup.value['locked'];
    
    if (this.usuarioFormGroup.value['password'] !== '') {
      userDto.password = this.usuarioFormGroup.value['password'];
    }

    if (this.esNuevo) {
      this.userService.createUser(userDto).subscribe((response: Respuesta) => {
        if (!response.error) {
          this.userService.getAllUser().subscribe((users: UserDto[]) => {
            this.userService.userCambio.next(users);
            this.userService.mensaje.next("Se creo correctamente.");
          });
        } else {
          this.userService.mensaje.next(response.message);
        }
      });
    } else {

      userDto.persons_id = this.userDto.persons_id;
      this.userService.updateUser(this.userDto.id, userDto).subscribe((response: Respuesta)=> {
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
    
    this.dialogRef.close();
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
      locked: [false],
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

  cancelar() {
    this.dialogRef.close();
  }
}

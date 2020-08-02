import { Respuesta } from './../../../../core/models/respuesta.model';
import { PersonService } from './../../../../core/services/person.service';
import { Person } from './../../../../core/models/person.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-client-create',
  templateUrl: './sub-client-create.component.html',
  styleUrls: ['./sub-client-create.component.css']
})
export class SubClientCreateComponent implements OnInit {
  public datoPersonalFormGroup: FormGroup;
  public is_create: boolean;
  id: number;
  title: string = "Crear cliente";
  private person: Person;
  constructor(
    private personService: PersonService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.buildFomDatosClients();
  }

  ngOnInit(): void {
    
    this.route.params.subscribe((param: Params)=> {
      this.id = param['id'];
      this.is_create = param['id'] == null;
      this.initForm();
    });
  }

  private initForm() {
    if (!this.is_create) {
      this.title = "Modificar cliente";
      this.personService.findById(this.id).subscribe((data: Person) => {
        this.datoPersonalFormGroup.patchValue(data);
        this.person = data;
      });
    }
  }

  onSubmit() {
    let person = new Person();
    person.name = this.datoPersonalFormGroup.value['name'];
    person.lastname = this.datoPersonalFormGroup.value['lastname'];
    person.gender = this.datoPersonalFormGroup.value['gender'];
    person.email = this.datoPersonalFormGroup.value['email'];
    person.phone = this.datoPersonalFormGroup.value['phone'];
    person.avatar_url = this.datoPersonalFormGroup.value['avatar_url'];
    person.locked = this.datoPersonalFormGroup.value['locked'];
    person.visible = this.datoPersonalFormGroup.value['visible'];
    
    if (!this.is_create) {
      person.id = this.person.id;
      this.personService.updatePerson(this.person.id, person).subscribe((response: Respuesta)=> {
        if (!response.error) {
          this.personService.mensaje.next("Se modificó correctamente.");
          this.router.navigate(["/client"]);
        } else {
          this.personService.mensaje.next(response.message);
        }
      });
    } else {
      this.personService.createPerson(person).subscribe((response: Respuesta) => {
        if (!response.error) {
          this.personService.mensaje.next("Se creo correctamente.");
          this.router.navigate(["/client"]);
        } else {
          this.personService.mensaje.next(response.message);
        }
      });
    } 
  }

  private buildFomDatosClients() {

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

}

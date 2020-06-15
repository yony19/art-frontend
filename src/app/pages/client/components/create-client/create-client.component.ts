import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/core/services/client.service';
import { Client } from 'src/app/core/models/client.model';
import { ClientDto } from 'src/app/core/dto/clientDto.model';
import { Respuesta } from 'src/app/core/models/respuesta.model';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  public clientForm: FormGroup;
  public is_crate: boolean;
  
  constructor(
    public dialogRef: MatDialogRef<CreateClientComponent>,
    @Inject(MAT_DIALOG_DATA) public client: Client,
    private clientService: ClientService,
    private _formBuilder: FormBuilder
  ) {
    
    this.buildFomDatosClients();
  }

  ngOnInit(): void {
    if (typeof this.client.id === "undefined") {
      this.is_crate = true;
    }

    if (!this.is_crate) {
      this.clientForm.patchValue(this.client);
    }
  }

  onSubmit(form) {
    let client = new ClientDto();
    client.name = this.clientForm.value['name'];
    client.business_name = this.clientForm.value['business_name'];
    client.nuit = this.clientForm.value['nuit'];
    client.address = this.clientForm.value['address'];
    client.phone = this.clientForm.value['phone'];
    client.enabled = this.clientForm.value['enabled'];

    if (!this.is_crate) {
      client.id = this.client.id;
      this.clientService.update(this.client.id, client).subscribe((response: Respuesta)=> {
        if (!response.error) {
          console.log(response);
          this.clientService.getAllClients().subscribe(client => {
            this.clientService.clientCambio.next(client);
            this.clientService.mensaje.next("Se modificó correctamente.");
          });
        } else {
          this.clientService.mensaje.next(response.message);
        }
      });
    } else {
      this.clientService.create(client).subscribe((response: Respuesta) => {
        if (!response.error) {
          this.clientService.getAllClients().subscribe((client: Client[]) => {
            this.clientService.clientCambio.next(client);
            this.clientService.mensaje.next("Se creo correctamente.");
          });
        } else {
          this.clientService.mensaje.next(response.message);
        }
      });
    }
    
    this.dialogRef.close();
  }

  cancelar() {
    this.dialogRef.close();
  }

  private buildFomDatosClients() {
    this.clientForm = this._formBuilder.group({ 
      id: [''],
      name: ['', Validators.required],
      business_name: ['', Validators.required],
      nuit: [''],
      address: ['', Validators.required],
      phone: [''],
      enabled: ['', Validators.required],
    });
  }
}

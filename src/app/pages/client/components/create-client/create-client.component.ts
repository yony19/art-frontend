import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientDto } from 'src/app/core/dto/clientDto.model';
import { ClientService } from 'src/app/core/services/client.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  datoPersonalFormGroup: FormGroup;
  usuarioFormGroup: FormGroup;
  
  constructor(
    public dialogRef: MatDialogRef<CreateClientComponent>,
    @Inject(MAT_DIALOG_DATA) public clientDto: ClientDto,
    private clientService: ClientService,
    private _formBuilder: FormBuilder
  ) {
    
    this.buildFomDatosClients();
  }

  ngOnInit(): void {

  }

  onSubmit(form) {
    this.clientService.create(form.value).subscribe(client => {
      console.log(client);
    });
  }
  private buildFomDatosClients() {
    this.datoPersonalFormGroup = this._formBuilder.group({ 
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

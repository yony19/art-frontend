import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ClientDto } from '../dto/clientDto.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(
    private http: HttpClient
  ) { }

  getAllClients() {
    return this.http.get<ClientDto[]>(`${environment.url_api}/clients`)
      .pipe(
        catchError(this.handlerError),
        map((response: any) => {
          return response.data as ClientDto[]
        })
      );
  }

  getClient(id: number) {
    return this.http.get<ClientDto>(`${environment.url_api}/clients/${id}`)
      .pipe(
        catchError(this.handlerError)
      );
  }
  
  create(client: ClientDto): Observable<any>  {

    let headers = new HttpHeaders().set('Content-Type','application/json')
                                //.set('Authorization', token);
    return this.http.post<ClientDto>(`${environment.url_api}/clients`, client, {headers: headers})
    .pipe(
        catchError(this.handlerError)
      )
  }

  private handlerError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Ups algo salio mal')
  }

}

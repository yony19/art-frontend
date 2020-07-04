import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  public clientCambio = new Subject<Client[]>();
  public mensaje = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  getAllClients() {
    return this.http.get<Client[]>(`${environment.url_api}/clients`)
      .pipe(
        catchError(this.handlerError),
        map((response: any) => {
          return response.data as Client[]
        })
      );
  }

  getClient(id: number) {
    return this.http.get<Client>(`${environment.url_api}/clients/${id}`)
      .pipe(
        catchError(this.handlerError)
      );
  }
  
  create(client: Client): Observable<any>  {
    let headers = new HttpHeaders().set('Content-Type','application/json');
                                //.set('Authorization', token);
    return this.http.post<Client>(`${environment.url_api}/clients`, client, {headers: headers})
    .pipe(
        catchError(this.handlerError)
      )
  }

  update(id: number, client: Partial<Client>) {
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(`${environment.url_api}/clients/${id}`, client, {headers: headers})
    .pipe(
      catchError(this.handlerError),
    );
  }

  delete(id: number) {
    return this.http.delete(`${environment.url_api}/clients/${id}`)
    .pipe(
      catchError(this.handlerError),
    );
  }

  private handlerError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Ups algo salio mal')
  }

}

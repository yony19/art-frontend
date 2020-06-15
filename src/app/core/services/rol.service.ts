import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { Rol } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  public rolCambio = new Subject<Rol[]>();
  public mensaje = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  getAllRoles() {
    return this.http.get<Rol[]>(`${environment.url_api}/roles`)
      .pipe(
        catchError(this.handlerError),
        map((response: any) => {
          return response.data as Rol[]
        })
      );
  }

  getRol(id: number) {
    return this.http.get<Rol>(`${environment.url_api}/roles/${id}`)
      .pipe(
        catchError(this.handlerError)
      );
  }
  
  create(rol: Rol) {
  }

  update(id: number, rol: Partial<Rol>) {
  }

  delete(id: number) {
  }

  private handlerError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Ups algo salio mal')
  }

}

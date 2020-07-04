import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable, Subject } from 'rxjs';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  public roleCambio = new Subject<Role[]>();
  public mensaje = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${environment.url_api}/roles`)
      .pipe(
        catchError(this.handlerError),
        map((response: any) => {
          return response.data as Role[]
        })
      );
  }

  getRol(id: number): Observable<Role> {
    return this.http.get<Role>(`${environment.url_api}/roles/${id}`)
      .pipe(
        catchError(this.handlerError)
      );
  }
  
  create(role: Role) {
    return this.http.post(`${environment.url_api}/roles`, role)
      .pipe(
        catchError(this.handlerError)
      );
  }

  update(id: number, role: Partial<Role>) {
    return this.http.put(`${environment.url_api}/roles/${id}`, role)
      .pipe(
        catchError(this.handlerError)
      );
  }

  delete(id: number) {
    return this.http.delete(`${environment.url_api}/roles/${id}`)
      .pipe(
        catchError(this.handlerError)
      );
  }

  private handlerError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Ups algo salio mal')
  }

}

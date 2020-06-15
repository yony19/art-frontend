import { UserDto } from './../dto/userDto.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCambio = new Subject<UserDto[]>();
  mensaje = new Subject<string>();
    
  constructor(
    private http: HttpClient
  ) { }

  getAllUser() {
    return this.http.get<UserDto[]>(`${environment.url_api}/users`)
      .pipe(
        catchError(this.handlerError),
        map((response: any) => {
          return response.data as UserDto[]
        })
      );
  }

  getUser(id: number) {
    return this.http.get<UserDto>(`${environment.url_api}/users/${id}`)
      .pipe(
        catchError(this.handlerError)
      );
  }

  createUser(userdto: UserDto) {
    return this.http.post(`${environment.url_api}/users`, userdto)
    .pipe(
      catchError(this.handlerError),
    );
  }

  updateUser(id: number, changes: Partial<UserDto>) {
    return this.http.put(`${environment.url_api}/users/${id}`, changes)
    .pipe(
      catchError(this.handlerError),
    );
  }

  deleteUser(id: number) {
    return this.http.delete(`${environment.url_api}/users/${id}`)
    .pipe(
      catchError(this.handlerError),
    );
  }
  
  private handlerError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Ups algo salio mal')
  }

}

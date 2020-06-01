import { UserDto } from './../dto/userDto.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

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
  
  private handlerError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Ups algo salio mal')
  }

}

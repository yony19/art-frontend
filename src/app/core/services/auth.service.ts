import { catchError, map } from 'rxjs/operators';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  mensaje = new Subject<string>();

  constructor(
    private http: HttpClient
  ) { }

  estaLogeado() {
    let token = sessionStorage.getItem('access_token');
    return token !=null;
  }

  login(credentials: any) {
    return this.http.post(`${environment.url_api}/session`, credentials)
    .pipe(
      //catchError(this.handlerError),
      map((response: any) => {
        return response.data
      })
    );;
  }

  logout() {
    return null;
  }

  hasUser() {
    return null;
  }


  private handlerError(error: HttpErrorResponse) {
    console.log(error.error);
    
    return throwError('Ups algo salio mal')
  }

}

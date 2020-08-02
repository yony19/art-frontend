import { Person } from './../models/person.model';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  personCambio = new Subject<Person[]>();
  mensaje = new Subject<string>();
    
  constructor(
    private http: HttpClient
  ) { }

  getAllPersons() {
    return this.http.get<Person[]>(`${environment.url_api}/persons/simple`)
      .pipe(
        catchError(this.handlerError),
        map((response: any) => {
          return response.data as Person[]
        })
      );
  }

  findById(id: number) {
    return this.http.get<Person>(`${environment.url_api}/persons/${id}`)
      .pipe(
        catchError(this.handlerError),
        map((response: any) => {
            return response.data as Person
          })
      );
  }

  createPerson(person: Person) {
    return this.http.post(`${environment.url_api}/persons`, person)
    .pipe(
      catchError(this.handlerError),
    );
  }

  updatePerson(id: number, changes: Partial<Person>) {
    return this.http.put(`${environment.url_api}/persons/${id}`, changes)
    .pipe(
      catchError(this.handlerError),
    );
  }

  deletePerson(id: number) {
    return this.http.delete(`${environment.url_api}/persons/${id}`)
    .pipe(
      catchError(this.handlerError),
    );
  }
  
  private handlerError(error: HttpErrorResponse) {
    console.log(error);
    return throwError('Ups algo salio mal')
  }

}

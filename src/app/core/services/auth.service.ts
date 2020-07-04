import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) { }

  createUser(email: string, password: string) {
    return null;
  }

  login(email: string, password: string) {
    return null;
  }

  logout() {
    return null;
  }

  hasUser() {
    return null;
  }
}

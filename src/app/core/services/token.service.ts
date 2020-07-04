import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string) {
    sessionStorage.setItem('access_token', token);
  }

  getToken() {
    return sessionStorage.getItem('access_token');
  }
}

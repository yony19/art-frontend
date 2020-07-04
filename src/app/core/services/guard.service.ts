import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authService: AuthService,private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //logica verificar si el token esta activo => true
    //redireccion a login => false
    let rpta = this.authService.estaLogeado();
    if (!rpta) {
      sessionStorage.clear();
      this.router.navigate(['auth/login']);
      return false;
    } else {
      let access_token = sessionStorage.getItem('access_token');
      if (!helper.isTokenExpired(access_token)) {
        return true;
      } else {
        sessionStorage.clear();
        this.router.navigate(['auth/login']);
        return false;
      }
    }
  }
}

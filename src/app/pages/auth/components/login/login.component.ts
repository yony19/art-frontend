import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../../../../core/services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  mensaje: string;

  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.authService.mensaje.subscribe(data => {
      this.snackBar.open(data, null, { duration: 2000});
    });
  }

  checkLogin(event: Event) 
  {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
          .subscribe(token => {
            sessionStorage.setItem("access_token", token);
            this.router.navigate(['./dashboard']);
          },
          error => {
            this.authService.mensaje.next(error.error.message);
          });
    }
  }
}

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

  loginForm = this.fb.group({
    email: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) { }

  checkLogin(event: Event) 
  {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.router.navigate(['./user']);
    }
  }

  ngOnInit() {
  }

}

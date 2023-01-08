import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  form: FormGroup = new FormGroup({
    username: new FormControl(""),
    password: new FormControl(""),
  });

  isLogin: Boolean = false
  errorMessage: any

  constructor(
    private authService: AuthService, 
    private apiService: ApiService, 
    private router: Router) { }

  ngOnInit() {
    this.isUserLogin();
  }

  isUserLogin() {
    if(this.authService.getUserDetails()) {
      this.isLogin = true;
    }
  }

  submitForm() {
    this.apiService.postRequest("api/auth/login", this.form.value).subscribe((res:any) => {
      if(res.status) {
        this.authService.setDataInLocalStorage("userData", JSON.stringify(res.data));
        this.authService.setDataInLocalStorage("token", JSON.stringify(res.token));
        this.router.navigate(["/"]);
      }
    })
  }
}

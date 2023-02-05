import { Component } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
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
    this.apiService.postRequest("auth/register", this.form.value).subscribe((res:any) => {
      if(res.status) {
        this.router.navigate(["/login"]);
      }
    })
  }
}

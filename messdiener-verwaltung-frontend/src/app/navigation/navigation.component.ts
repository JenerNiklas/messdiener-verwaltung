import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  isLoggedIn(): Boolean {
    return this.authService.getToken() !== null;
  }

  logout(): void {
    console.info("LOGOUT");
    this.authService.clearStorage();
    this.router.navigate([""]);
  }
}

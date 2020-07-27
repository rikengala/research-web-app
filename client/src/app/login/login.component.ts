import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
import { ɵangular_packages_platform_browser_platform_browser_d } from '@angular/platform-browser';

@Component({
  // selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthenticationService]
})
export class LoginComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    password: '',
    name:''
  };
  constructor(private auth: AuthenticationService, private router: Router) {}
  ngOnInit(): void {
  }
  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/');
    }, (err) => {
      console.error(err);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../authentication.service';
import { Router } from '@angular/router';
@Component({
  // selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers:[AuthenticationService]
})
export class SignupComponent implements OnInit {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    
  };
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }
  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/login');
    }, (err) => {
      console.error(err);
    });
  }
}

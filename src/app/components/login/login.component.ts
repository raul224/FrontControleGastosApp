import { LoginService } from './../../services/login/login.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private LoginService: LoginService
  ){}

  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl('')
  });

  async onSubmit(): Promise<void>{
    console.log("Bateu");
    console.log()
    //await this.loginService.autenticationRequest();
  }
}

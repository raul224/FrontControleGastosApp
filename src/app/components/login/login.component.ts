import { AutenticationService } from '../../services/autentication/autentication.service';
import { Component } from '@angular/core';
import { loginModel } from 'src/app/models/loginModel';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: loginModel = new loginModel();

  constructor(
    private autenticationService: AutenticationService,
    private router: Router
  ){}

  submitLogin(): void {
    this.autenticationService
      .autenticationRequest(this.loginModel)
      .subscribe({
      next:(response) => {
        localStorage.setItem("usuario", JSON.stringify(response))
        this.router.navigate(["home"]);
      },
      error: (error) =>{
        alert(error.error());
      }
    });
  }

  registerPage(): void{
    this.router.navigate(["register"]);
  }
}

import { AutenticationService } from '../../services/autentication/autentication.service';
import { Component } from '@angular/core';
import { loginModel } from 'src/app/models/loginModel';
import {Router} from "@angular/router";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: loginModel = new loginModel();

  constructor(
    private autenticationService: AutenticationService,
    private router: Router,
    private builder: FormBuilder
  ){
    sessionStorage.clear()
  }

  loginForm = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('', Validators.required)
  })

  submitLogin(): void {
    if(this.loginForm.valid){
      var email = this.loginForm.value.email
      var password = this.loginForm.value.password
      this.loginModel.Email = email || ""
      this.loginModel.Password = password || ""

      this.autenticationService
        .autenticationRequest(this.loginModel)
        .subscribe({
          next:(response) => {
            sessionStorage.setItem("usuario", JSON.stringify(response))
            this.router.navigate([""]);
          },
          error: (error) =>{
            alert("Login não encontrado");
          }
        });
    }else {
      alert("Por favor, inserir as credenciais")
    }
  }
}

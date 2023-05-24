import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AutenticationService} from "../../services/autentication/autentication.service";
import {RegisterModel} from "../../models/registerModel";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerModel: RegisterModel = new RegisterModel();

  constructor(
    private autenticationService: AutenticationService,
    private router: Router){}

  submitRegister(): void{
    this.autenticationService.registerRequest(this.registerModel)
      .subscribe({
        next:(response) => {
          alert("Login realizado com sucesso")
          localStorage.setItem("usuario", JSON.stringify(response))
          this.router.navigate(["home"])
        },
        error:(error) => {
          alert("Falha ao logar " + error.toString())
        }
      })
  }

  loginPage(): void{
    this.router.navigate([""])
  }
}

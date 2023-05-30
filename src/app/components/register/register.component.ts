import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AutenticationService} from "../../services/autentication/autentication.service";
import {RegisterModel} from "../../models/registerModel";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerModel: RegisterModel = new RegisterModel();

  constructor(
    private autenticationService: AutenticationService,
    private router: Router,
    private builder: FormBuilder){}

  registerForm = this.builder.group({
    email: this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    name: this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.required),
    passwordValidation: this.builder.control('', Validators.required)
  })

  submitRegister(): void{
    if(this.registerForm.valid){
      this.registerModel.Email = this.registerForm.value.email || ""
      this.registerModel.Name = this.registerForm.value.name || ""
      this.registerModel.Password = this.registerForm.value.password || ""
      this.registerModel.PasswordValidation = this.registerForm.value.passwordValidation || ""

      this.autenticationService.registerRequest(this.registerModel)
        .subscribe({
          next:(response) => {
            console.log(response)
            localStorage.setItem("usuario", JSON.stringify(response))
            alert("Login realizado com sucesso")
            this.router.navigate([""])
          },
          error:(error) => {
            alert("Falha ao registrar")
          }
        })
    } else {
      alert("Por favor, adicionar os dados necessários")
    }
  }
}

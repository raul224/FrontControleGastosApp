import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AutenticationService} from "../../services/autentication/autentication.service";
import {SweetAlertService} from "../../services/sweetAlert/sweet-alert.service";
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
    private sweetAlertService: SweetAlertService,
    private router: Router){}

  submitRegister(): void{
    this.autenticationService.registerRequest(this.registerModel)
      .subscribe({
        next:(response) => {
          this.sweetAlertService.sucesses("Sucesses",response);
          localStorage.setItem("user", response);
          this.router.navigate(["home"]);
        },
        error:(error) => {
          this.sweetAlertService.failure("Error", error);
        }
      })
  }
}

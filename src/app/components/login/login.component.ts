import { AutenticationService } from '../../services/autentication/autentication.service';
import { Component } from '@angular/core';
import { loginModel } from 'src/app/models/loginModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginModel: loginModel = new loginModel();

  constructor(
    private autenticationService: AutenticationService
  ){}

  submitLogin(): void {
    this.autenticationService
      .autenticationRequest(this.loginModel)
      .subscribe({
        next:(response) => {
          console.log(response)
        },
        error: (error) =>{
          alert(error)
        }
      });
  }

  registerPage(): void{

  }
}

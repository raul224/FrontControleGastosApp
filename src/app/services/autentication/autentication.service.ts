import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';
import { userModel } from "../../models/userModel";

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  url: string = 'https://localhost:7172/Autentication';

  constructor(private httpClient: HttpClient){ }

  autenticationRequest(loginModel: loginModel) : Observable<userModel> {
    return this.httpClient.post<userModel>(this.url, loginModel);
  }

  registerRequest(registerModel : RegisterModel) : Observable<userModel> {
    return this.httpClient.post<userModel>(this.url + '/register', registerModel);
  }

  isUserAutenticated(): string{
    return sessionStorage.getItem("usuario") || ""
  }
}

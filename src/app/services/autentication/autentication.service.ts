import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  url: string = 'https://localhost:7172/Autentication';

  constructor(private httpClient: HttpClient){ }

  autenticationRequest(loginModel: loginModel) : Observable<any> {
    return this.httpClient.post(this.url, loginModel);
  }

  registerRequest(registerModel : RegisterModel) : Observable<any> {
    return this.httpClient.post(this.url + '/register', registerModel);
  }
}

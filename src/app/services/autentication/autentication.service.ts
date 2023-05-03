import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { loginModel } from 'src/app/models/loginModel';
import { RegisterModel } from 'src/app/models/registerModel';

@Injectable({
  providedIn: 'root'
})
export class AutenticationService {
  url: string = 'http://localhost:8080';

  constructor(private httpClient: HttpClient){ }

  autenticationRequest(loginModel: loginModel) : Observable<any> {
    return this.httpClient.post(this.url + '/login', loginModel);
  }

  registerRequest(registerModel : RegisterModel) : Observable<any> {
    return this.httpClient.post(this.url + '/register', registerModel);
  }
}

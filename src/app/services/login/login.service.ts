import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClientModule){ }
  url: string = 'http://localhost:8080';

  autenticationRequest() : any {

  }
}

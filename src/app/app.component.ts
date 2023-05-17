import { Component } from '@angular/core';
import {HomeService} from "./services/home/home.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ControleGastosFront';
  logado: boolean = false;

  constructor(private homeService: HomeService) {
  }
  consultarLancamentos(): any{
    if(this.logado){
      var usuario = localStorage.getItem("usuario");

    } else {
      alert("Por favor, efetuar o login")
    }
  }
}

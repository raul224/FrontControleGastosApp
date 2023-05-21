import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {HomeService} from "../../../services/home/home.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-consulta-anterior',
  templateUrl: './consulta-anterior.component.html',
  styleUrls: ['./consulta-anterior.component.css'],
  providers: [DynamicDialogRef]
})
export class ConsultaAnteriorComponent implements OnInit{
  ngOnInit(): void {
  }
  logado: boolean = false;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private homeService: HomeService,
    private router: Router) {}

  consultarLancamentos(): any{
    if(this.logado){
      var usuario = localStorage.getItem("usuario");

    } else {
      alert("Por favor, efetuar o login")
      this.router.navigate([""])
    }
  }
}

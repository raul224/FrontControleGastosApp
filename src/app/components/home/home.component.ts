import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home/home.service";
import {Router} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FlowPreviewComponent} from "../DialogComponents/consulta-anterior/flow-preview.component";
import { flowCadastroModel } from "../../models/flowCadastroModel";
import { userModel } from "../../models/userModel";
import { flowModel } from "../../models/flowModel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService]
})
export class HomeComponent{
  logado: boolean = false;
  lancamentoCadastro: flowCadastroModel = new flowCadastroModel();
  user: userModel = new userModel();
  lancamentos: flowModel[] = []
  ref: DynamicDialogRef | undefined;

  constructor(
  private homeService: HomeService,
  private router: Router,
  public dialogService: DialogService) {
    this.user = JSON.parse(localStorage.getItem("usuario") || "")
    this.CarregarLancamentos()
  }

  ConsultaAnteriorDialog(){
    this.ref = this.dialogService.open(FlowPreviewComponent, {
      header: "Consultar dados anteriores",
      width: '60%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: false,
      data: {
        usuario: this.user
      }
    })
  }

  private CarregarLancamentos(): any{
    this.homeService.GetLancamentos(this.user.Id)
      .subscribe({
      next:(response) => {
        this.lancamentos.concat(response)
      },
      error:(error) => {
        alert("Erro ao carregamento dos lancamentos, favor tentar novamente")
      }})
  }

  CadastraLancamento(): any{
    this.lancamentoCadastro.UsuarioId = this.user.Id

    this.homeService.CadastraLancamento(this.lancamentoCadastro)
      .subscribe({
      next:(response) =>{
        this.CarregarLancamentos()
      },
      error:(error) =>{
        alert("Erro no cadastro do lancamento, tente novamente")
      }})
  }

  Sair(): any{
    localStorage.clear()
    this.router.navigate(["login"])
  }
}

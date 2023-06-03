import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home/home.service";
import {Router} from "@angular/router";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FlowPreviewComponent} from "../DialogComponents/consulta-anterior/flow-preview.component";
import { flowCadastroModel } from "../../models/flowCadastroModel";
import { userModel } from "../../models/userModel";
import { flowModel } from "../../models/flowModel";
import {tap} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {resolve} from "@angular/compiler-cli";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService]
})
export class HomeComponent implements OnInit{
  logado: boolean = false;
  lancamentoCadastro: flowCadastroModel = new flowCadastroModel();
  user: userModel = new userModel();
  lancamentos: flowModel[] = []
  ref: DynamicDialogRef | undefined;
  constructor(
  private homeService: HomeService,
  public dialogService: DialogService) {}

  ngOnInit(): void {
    this.user = JSON.parse(<string>sessionStorage.getItem("usuario"))
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
    console.log(this.user.Id)
    this.homeService.GetLancamentos(this.user.Id)
      .subscribe( {
        next:(response) => {
          this.lancamentos = response
        },
        error:(error) => {
          alert("Nao foi possível carregar os lançamentos")
        }
      })
  }

  CadastraLancamento(): any{
    this.lancamentoCadastro.UsuarioId = this.user.Id

    this.homeService.CadastraLancamento(this.lancamentoCadastro)
      .subscribe({
        next:(response) => {
          this.CarregarLancamentos()
        },
        error:(error) => {
          alert("Erro no cadastro do lancamento, tente novamente")
        }})
  }

  Sair(): any{
    sessionStorage.clear()
  }
}

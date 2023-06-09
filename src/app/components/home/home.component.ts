import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home/home.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FlowPreviewComponent} from "../DialogComponents/consulta-anterior/flow-preview.component";
import { flowCreationModel } from "../../models/flowCreationModel";
import { userModel } from "../../models/userModel";
import { flowModel } from "../../models/flowModel";
import {Router} from "@angular/router";
import { FlowType } from 'src/app/models/Enums/FlowType';
import { AutenticationService } from 'src/app/services/autentication/autentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService]
})
export class HomeComponent implements OnInit{
  logado: boolean = false;
  flowCreationModel: flowCreationModel = new flowCreationModel();
  user: userModel = new userModel();
  flows: flowModel[] = []
  ref: DynamicDialogRef | undefined;
  flowTypeRecord = [
    "Credit",
    'Debit'
  ]

  selectedFlow: string = ""

  constructor(
  private homeService: HomeService,
  private autenticationService: AutenticationService,
  private dialogService: DialogService,
  private  router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(<string>sessionStorage.getItem("usuario"))
    if(this.user){
      this.CarregarLancamentos()
      this.logado = true
    }
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

  private AtualizarSaldo(): any{
    this.autenticationService.getUpdatedUser(this.user.id)
      .subscribe({
        next:(response) => {
          sessionStorage.setItem('usuario', JSON.stringify(response))
          this.user = response
        },
        error:(error) => {
          alert("Erro ao atualizar o saldo")
        }
      })
  }

  private CarregarLancamentos(): any{
    this.homeService.GetLancamentos(this.user.id)
      .subscribe( {
        next:(response) => {
          this.flows = response
        },
        error:(error) => {
          alert("Nao foi possível carregar os lançamentos")
        }
      })
  }

  CadastraLancamento(): any{
    this.flowCreationModel.userId = this.user.id

    if(this.selectedFlow === "Credit"){
      this.flowCreationModel.flowType = 0
    }else {
      this.flowCreationModel.flowType = 1
    }

    this.homeService.CadastraLancamento(this.flowCreationModel)
      .subscribe({
        next:(response) => {
          this.CarregarLancamentos()
          this.AtualizarSaldo()
        },
        error:(error) => {
          alert("Erro no cadastro do lancamento, tente novamente")
        }})
  }

  DeletarLancamento(id: string): any{
    this.homeService.DeletarLancamento(id)
      .subscribe({
        next:(response) => {
          this.CarregarLancamentos()
          this.AtualizarSaldo()
        },
        error:(error) => {
          alert("Não foi possível excluir esse lancamento")
        }
      })
  }

  Sair(): any{
    sessionStorage.clear()
    this.router.navigate(["/login"])
  }
}

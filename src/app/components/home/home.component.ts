import {Component, OnInit} from '@angular/core';
import {HomeService} from "../../services/home/home.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {FlowPreviewComponent} from "../DialogComponents/consulta-anterior/flow-preview.component";
import { flowCreationModel } from "../../models/flowCreationModel";
import { userModel } from "../../models/userModel";
import { flowModel } from "../../models/flowModel";
import {Router} from "@angular/router";

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
  constructor(
  private homeService: HomeService,
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

    this.homeService.CadastraLancamento(this.flowCreationModel)
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
    this.router.navigate(["/login"])
  }
}

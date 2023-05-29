import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {HomeService} from "../../../services/home/home.service";
import { userModel } from "../../../models/userModel";
import { dataRangeModel } from "../../../models/dataRangeModel";

@Component({
  selector: 'app-consulta-anterior',
  templateUrl: './flow-preview.component.html',
  styleUrls: ['./flow-preview.component.css'],
  providers: [DynamicDialogRef]
})
export class FlowPreviewComponent {
  usuario: userModel = new userModel()
  dataRange: dataRangeModel = new dataRangeModel()

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private homeService: HomeService,) {
      this.usuario = this.config.data.usuario
    }

  consultarLancamentos(): any{
    this.dataRange.UsuarioId = this.usuario.Id

    this.homeService.GetLancamentosAnteriores(this.dataRange)
      .subscribe({
      next:(response) => {
        this.ref.close()
      },
      error:(error) => {
        alert("Erro na consulta, tente novamente")
      }})

  }
}

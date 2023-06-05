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
    this.dataRange.userId = this.usuario.id

    this.homeService.GetLancamentosAnteriores(this.dataRange)
      .subscribe({
      next:(response) => {
        const file = new Blob([response])
        const blob = window.URL.createObjectURL(file);
        const link = document.createElement('a')
        link.href = blob
        link.download = 'lancamentos.csv'

        link.click()

        window.URL.revokeObjectURL(blob)
        link.remove()
      },
      error:(error) => {
        alert("Erro na consulta, tente novamente")
      }})

  }
}

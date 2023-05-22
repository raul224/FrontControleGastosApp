import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {HomeService} from "../../../services/home/home.service";
import {UsuarioModel} from "../../../models/UsuarioModel";
import {DataRangeModel} from "../../../models/DataRangeModel";

@Component({
  selector: 'app-consulta-anterior',
  templateUrl: './consulta-anterior.component.html',
  styleUrls: ['./consulta-anterior.component.css'],
  providers: [DynamicDialogRef]
})
export class ConsultaAnteriorComponent implements OnInit{
  usuario: UsuarioModel = new UsuarioModel()
  dataRange: DataRangeModel = new DataRangeModel()

  ngOnInit(): void {
    this.usuario = this.config.data.usuario
  }

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private homeService: HomeService,) {}

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
